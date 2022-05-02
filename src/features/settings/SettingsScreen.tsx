import React, { memo, ReactText, useCallback, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Alert, SectionList } from "react-native";
import { useSelector } from "react-redux";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { isEqual } from "lodash";

import Text from "../../components/Text";
import { RootState } from "../../store/rootReducer";
import { useAppDispatch } from "../../store/store";
import appSlice from "../../store/user/appSlice";
import { SignedInStackNavigationProp } from "../../navigation/navigationRootTypes";
import { MainTabParamList } from "../../navigation/main/mainTabNavigatorTypes";
import SettingListItem, { SettingListItemType } from "./SettingListItem";
import useAuthIntervals from "./useAuthIntervals";
import Box from "../../components/Box";
import { SUPPORTED_LANGUAGUES } from "../../i18n/i18nTypes";
import { useLanguageContext } from "../../providers/LanguageProvider";
import useLinkWallet from "../../utils/useLinkWallet";

type Route = RouteProp<MainTabParamList, "Settings">;

const SettingsScreen = () => {
  const { t } = useTranslation();
  const { params } = useRoute<Route>();
  const dispatch = useAppDispatch();
  const app = useSelector((state: RootState) => state.app, isEqual);
  const authIntervals = useAuthIntervals();
  const navigation = useNavigation<SignedInStackNavigationProp>();
  const { changeLanguage, language } = useLanguageContext();

  const { walletAddress, walletToken } = useSelector((state: RootState) => state.app);

  const truncatedAddress = useMemo(() => {
    if (!walletAddress) return;

    return [walletAddress.slice(0, 8), walletAddress.slice(-8)].join("...");
  }, [walletAddress]);

  useEffect(() => {
    if (!params?.pinVerifiedFor) return;

    const { pinVerifiedFor } = params;

    switch (pinVerifiedFor) {
      case "disablePin":
        dispatch(appSlice.actions.disablePin());
        break;
      case "resetPin":
        navigation.push("CreatePinScreen", { pinReset: true });
        break;
    }
  }, [dispatch, params, navigation]);

  const handleLanguageChange = useCallback(
    (lng: string) => {
      changeLanguage(lng);
    },
    [changeLanguage],
  );

  const handlePinRequired = useCallback(
    (value?: boolean) => {
      if (!app.isPinRequired && value) {
        // toggling on
        navigation.push("CreatePinScreen", { pinReset: true });
      }

      if (app.isPinRequired && !value) {
        // toggling off, confirm pin before turning off
        navigation.push("LockScreen", { requestType: "disablePin" });
      }
    },
    [app.isPinRequired, navigation],
  );

  const handleResetPin = useCallback(() => {
    navigation.push("LockScreen", { requestType: "resetPin" });
  }, [navigation]);

  const handleSignOut = useCallback(() => {
    Alert.alert(
      t("settingsScreen.sections.app.signOutAlert.title"),
      t("settingsScreen.sections.app.signOutAlert.body"),
      [
        {
          text: t("generic.cancel"),
          style: "cancel",
        },
        {
          text: t("settingsScreen.sections.app.signOut"),
          style: "destructive",
          onPress: () => {
            dispatch(appSlice.actions.signOut());
          },
        },
      ],
    );
  }, [t, dispatch]);

  const linkWallet = useLinkWallet();

  const handleIntervalSelected = useCallback(
    (value: ReactText) => {
      const number = typeof value === "number" ? value : parseInt(value, 10);
      dispatch(appSlice.actions.updateAuthInterval(number));
    },
    [dispatch],
  );

  const SectionData = useMemo(() => {
    let pin: SettingListItemType[] = [
      {
        title: t("settingsScreen.sections.security.enablePin"),
        onToggle: handlePinRequired,
        value: app.isPinRequired,
      },
    ];

    if (app.isPinRequired) {
      pin = [
        ...pin,
        {
          title: t("settingsScreen.sections.security.requirePin"),
          value: app.authInterval || "",
          select: {
            items: authIntervals,
            onValueSelect: handleIntervalSelected,
          },
        },
        {
          title: t("settingsScreen.sections.security.resetPin"),
          onPress: handleResetPin,
        },
      ];
    }

    const appSections = [
      {
        title: t("settingsScreen.sections.app.language"),
        value: language,
        select: {
          items: SUPPORTED_LANGUAGUES,
          onValueSelect: handleLanguageChange,
        },
      },
      {
        title: t("settingsScreen.sections.app.signOutWithLink", {
          address: truncatedAddress,
        }),
        onPress: handleSignOut,
        destructive: true,
      },
    ] as SettingListItemType[];

    if (!walletToken) {
      appSections.splice(1, 0, {
        title: t("settingsScreen.sections.app.linkWallet"),
        onPress: linkWallet,
      });
    }

    return [
      {
        title: t("settingsScreen.sections.security.title"),
        data: pin,
      },
      {
        title: t("settingsScreen.sections.app.title"),
        data: appSections,
      },
    ];
  }, [
    t,
    handlePinRequired,
    app.isPinRequired,
    app.authInterval,
    language,
    handleLanguageChange,
    truncatedAddress,
    handleSignOut,
    authIntervals,
    handleIntervalSelected,
    handleResetPin,
    linkWallet,
    walletToken,
  ]);

  const renderItem = useCallback(
    ({ item, index, section }) => (
      <SettingListItem
        item={item}
        isTop={index === 0}
        isBottom={index === section.data.length - 1}
      />
    ),
    [],
  );

  const renderSectionHeader = useCallback(
    ({ section: { title, icon } }) => (
      <Box
        flexDirection="row"
        alignItems="center"
        paddingTop="l"
        paddingBottom="s"
        paddingHorizontal="xs"
        backgroundColor="primaryBackground"
      >
        {icon !== undefined && icon}
        <Text variant="body1" marginLeft="s">
          {title}
        </Text>
      </Box>
    ),
    [],
  );

  const renderSectionFooter = useCallback(({ section: { footer } }) => footer, []);

  const keyExtractor = useCallback((item, index) => item.title + index, []);

  return (
    <Box flex={1} backgroundColor="primaryBackground" paddingHorizontal="m" paddingBottom="m">
      <Text variant="h2" textAlign="center">
        {t("settingsScreen.title")}
      </Text>

      <SectionList
        sections={SectionData}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        renderSectionFooter={renderSectionFooter}
        initialNumToRender={100}
        // ^ Sometimes on initial page load there is a bug with SectionList
        // where it won't render all items right away. This seems to fix it.
      />
    </Box>
  );
};

export default memo(SettingsScreen);
