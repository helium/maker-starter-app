import React, { memo, useCallback, useEffect } from "react";
import { Alert } from "react-native";
import { useTranslation } from "react-i18next";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { useAsync } from "react-async-hook";
import { useStateWithCallbackLazy } from "use-state-with-callback";
import * as LocalAuthentication from "expo-local-authentication";
import {
  SignedInStackNavigationProp,
  SignedInStackParamList,
} from "../../navigation/navigationRootTypes";
import { getSecureItem } from "../../utils/secureAccount";
import ConfirmPinView from "../../components/ConfirmPinView";
import { MainTabNavigationProp } from "../../navigation/main/mainTabNavigatorTypes";
import { useAppDispatch } from "../../store/store";
import appSlice from "../../store/user/appSlice";
import Box from "../../components/Box";

type Route = RouteProp<SignedInStackParamList, "LockScreen">;

const LockScreen = () => {
  const { t } = useTranslation();
  const {
    params: { lock: shouldLock, requestType },
  } = useRoute<Route>();
  const rootNav = useNavigation<SignedInStackNavigationProp>();
  const tabNav = useNavigation<MainTabNavigationProp>();
  const [locked, setLocked] = useStateWithCallbackLazy(shouldLock);
  const dispatch = useAppDispatch();

  const { result: pin } = useAsync(getSecureItem, ["userPin"]);

  const handleSuccess = useCallback(() => {
    if (shouldLock) {
      setLocked(false, () => {
        dispatch(appSlice.actions.lock(false));
        rootNav.goBack();
      });
    } else {
      tabNav.navigate("Settings", {
        pinVerifiedFor: requestType,
      });
    }
  }, [shouldLock, requestType, setLocked, dispatch, rootNav, tabNav]);

  const handleSignOut = useCallback(() => {
    Alert.alert(
      t("settingsScreen.sections.app.signOutAlert.title"),
      t("settingsScreen.sections.app.signOutAlert.body"),
      [
        {
          text: t("settingsScreen.sections.app.signOut"),
          style: "destructive",
          onPress: () => {
            dispatch(appSlice.actions.signOut());
          },
        },
        {
          text: t("generic.cancel"),
          style: "cancel",
        },
      ],
    );
  }, [t, dispatch]);

  const handleCancel = useCallback(() => {
    if (shouldLock) {
      handleSignOut();
    } else {
      rootNav.goBack();
    }
  }, [handleSignOut, rootNav, shouldLock]);

  useEffect(() => {
    const unsubscribe = rootNav.addListener("beforeRemove", (e) => {
      if (locked) e.preventDefault();
    });

    return unsubscribe;
  }, [rootNav, locked]);

  useEffect(() => {
    const localAuth = async () => {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      if (!isEnrolled || !hasHardware) return;

      const { success } = await LocalAuthentication.authenticateAsync();
      if (success) handleSuccess();
    };

    localAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box flex={1} backgroundColor="primaryBackground" paddingHorizontal="m">
      <ConfirmPinView
        originalPin={pin || ""}
        title={t("lockScreen.title")}
        subtitle={t("lockScreen.enterCurrent")}
        pinSuccess={handleSuccess}
        onCancel={handleCancel}
        clearable={requestType === "unlock"}
      />
    </Box>
  );
};

export default memo(LockScreen);
