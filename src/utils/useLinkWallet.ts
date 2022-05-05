import { useCallback } from "react";

import { WalletLink } from "@helium/react-native-sdk";
import { useTranslation } from "react-i18next";
import { Linking } from "react-native";
import { Config } from "react-native-config";
import { getBundleId } from "react-native-device-info";
import Toast from "react-native-simple-toast";

const useLinkWallet = () => {
  const { t } = useTranslation();

  const { delegateApps } = WalletLink;
  const heliumApp: WalletLink.DelegateApp = delegateApps[0];

  const linkWallet = useCallback(() => {
    const url = WalletLink.createWalletLinkUrl({
      universalLink: heliumApp.universalLink,
      requestAppId: getBundleId(),
      callbackUrl: Config.APP_LINK_PROTOCOL,
      appName: Config.APP_NAME,
    });

    try {
      Linking.openURL(url);
    } catch {
      Toast.showWithGravity(t("generic.openLinkError", { url }), Toast.LONG, Toast.CENTER);
    }
  }, [t, heliumApp]);

  return linkWallet;
};

export default useLinkWallet;
