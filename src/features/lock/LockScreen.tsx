import React, { memo, useCallback, useEffect } from "react";

import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { hasHardwareAsync, isEnrolledAsync, authenticateAsync } from "expo-local-authentication";
import { useAsync } from "react-async-hook";
import { useTranslation } from "react-i18next";
import { Alert } from "react-native";
import { useStateWithCallbackLazy } from "use-state-with-callback";

import Box from "components/Box";
import ConfirmPinView from "components/ConfirmPinView";
import { MainTabNavigationProp } from "navigation/main/mainTabNavigatorTypes";
import {
  SignedInStackNavigationProp,
  SignedInStackParamList,
} from "navigation/navigationRootTypes";
import { useAppDispatch } from "store/store";
import appSlice from "store/user/appSlice";
import { getSecureItem } from "utils/secureAccount";

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
      if (locked) {
        e.preventDefault();
      }
    });

    return unsubscribe;
  }, [rootNav, locked]);

  useEffect(() => {
    const localAuth = async () => {
      const hasHardware = await hasHardwareAsync();
      const isEnrolled = await isEnrolledAsync();
      if (!isEnrolled || !hasHardware) {
        return;
      }

      const { success } = await authenticateAsync();
      if (success) {
        handleSuccess();
      }
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
