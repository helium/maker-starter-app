import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Linking } from "react-native";
import Config from "react-native-config";
import queryString from "query-string";
import { useSelector } from "react-redux";
import { WalletLink as HeliumWalletLink } from "@helium/react-native-sdk";

import useMount from "../utils/useMount";
import { RootState } from "../store/rootReducer";
import { navigationRef } from "../navigation/navigator";
import {
  AppLink,
  AppLinkFields,
  AppLinkCategories,
  AppLinkCategoryType,
  WalletLink,
  HotspotLink,
} from "./appLinkTypes";
import { useAppDispatch } from "../store/store";
import appSlice from "../store/user/appSlice";
import useAlert from "../utils/useAlert";

export const createAppLink = (resource: AppLinkCategoryType, resourceId: string) =>
  `${Config.APP_LINK_PROTOCOL}${resource}/${resourceId}`;

const useAppLink = () => {
  const { showOKAlert } = useAlert();

  const [unhandledAppLink, setUnhandledLink] = useState<AppLink | WalletLink | null>(null);

  const {
    app: { isLocked },
  } = useSelector((state: RootState) => state);

  const dispatch = useAppDispatch();

  useMount(() => {
    Linking.addEventListener("url", ({ url: nextUrl }) => {
      if (!nextUrl) return;

      const link = parseUrl(nextUrl);
      if (!link) return;
      navToAppLink(link);
    });
    const getUrlAsync = async () => {
      const initialUrl = await Linking.getInitialURL();
      if (!initialUrl) return;

      const link = parseUrl(initialUrl);
      if (!link) return;
      navToAppLink(link);
    };

    getUrlAsync();
  });

  const navToAppLink = useCallback(
    (record: AppLink | WalletLink) => {
      if (isLocked) {
        setUnhandledLink(record);
        return;
      }

      switch (record.type) {
        case "add_gateway": {
          const { resource: txnStr } = record as AppLink;
          if (!txnStr) return;

          navigationRef.current?.navigate("HotspotOnboarding", {
            screen: "TxnConfirmScreen",
            params: { addGatewayTxn: txnStr },
          });
          break;
        }
        case "link_wallet": {
          const walletLink = record as WalletLink;
          if (walletLink.status === "success" && walletLink.token) {
            const parsedToken = HeliumWalletLink.parseWalletLinkToken(walletLink.token);
            if (parsedToken) {
              dispatch(
                appSlice.actions.storeWalletInfo({
                  address: parsedToken.address,
                  token: walletLink.token,
                }),
              );
              return;
            }
          }
          showOKAlert({ titleKey: "Can't link your wallet" });
          break;
        }
        case "sign_hotspot": {
          const hotspotLink = record as HotspotLink;
          if (hotspotLink.status === "success") {
            navigationRef.current?.navigate("HotspotOnboarding", {
              screen: "TxnSubmitedScreen",
              params: hotspotLink,
            });
          } else {
            // TODO: handle failure status codes
            // eslint-disable-next-line no-console
            console.error(`Failed with status ${hotspotLink.status}`);
            navigationRef.current?.navigate("MainTabs");
          }
          break;
        }
      }
    },
    [isLocked, dispatch, showOKAlert],
  );

  useEffect(() => {
    // Links will be handled once the app is unlocked
    if (!unhandledAppLink || isLocked) return;

    navToAppLink(unhandledAppLink);
    setUnhandledLink(null);
  }, [isLocked, navToAppLink, unhandledAppLink]);

  const parseUrl = useCallback((url: string) => {
    if (!url) return;

    const parsed = queryString.parseUrl(url);
    if (!parsed.url.includes(Config.APP_LINK_PROTOCOL)) return;

    const params = queryString.parse(queryString.extract(url));
    const record = AppLinkFields.reduce(
      (obj, k) => ({ ...obj, [k]: parsed.query[k] }),
      params,
    ) as AppLink;

    const path = parsed.url.replace(Config.APP_LINK_PROTOCOL, "");
    const [resourceType, ...rest] = path.split("/");
    if (resourceType && AppLinkCategories.find((k) => k === resourceType)) {
      record.type = resourceType as AppLinkCategoryType;
    }
    if (rest?.length) {
      record.resource = rest.join("/");
    }

    if (!record.type || !AppLinkCategories.find((k) => k === record.type)) {
      throw new Error(`Unsupported Link: ${JSON.stringify(record)}`);
    }
    return record;
  }, []);

  // const parseData = useCallback(
  //   (data: string, _scanType: AppLinkCategoryType): AppLink => {
  //     const urlParams = parseUrl(data)
  //     if (!urlParams) {
  //       throw new Error('Invalid Link')
  //     }
  //     return urlParams
  //   },
  //   [parseUrl],
  // )

  const handleBarCode = () => {};

  return { handleBarCode };
};

const initialState = {
  handleBarCode: () => new Promise<void>((resolve) => resolve()),
};

const LinkContext = createContext<ReturnType<typeof useAppLink>>(initialState);

const { Provider } = LinkContext;

const AppLinkProvider = ({ children }: { children: ReactNode }) => {
  return <Provider value={useAppLink()}>{children}</Provider>;
};

export const useAppLinkContext = () => useContext(LinkContext);

export default AppLinkProvider;
