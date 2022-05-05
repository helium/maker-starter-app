// eslint-disable-next-line import/no-unassigned-import
import "react-native-gesture-handler";
import React, { memo, useEffect } from "react";

import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { OnboardingProvider } from "@helium/react-native-sdk";
import MapboxGL from "@react-native-mapbox-gl/maps";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "@shopify/restyle";
import { preventAutoHideAsync, hideAsync } from "expo-splash-screen";
import { useAsync } from "react-async-hook";
import { LogBox, Platform, StatusBar, UIManager } from "react-native";
import useAppState from "react-native-appstate-hook";
import { Config } from "react-native-config";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

import NavigationRoot from "navigation/NavigationRoot";
import { navigationRef } from "navigation/navigator";
import { RootState } from "store/rootReducer";
import { useAppDispatch } from "store/store";
import appSlice, { restoreAppSettings } from "store/user/appSlice";
import { theme } from "theme/theme";
import useMount from "utils/useMount";

preventAutoHideAsync().catch(() => {
  /* reloading the app might trigger some race conditions, ignore them */
});

const App = () => {
  if (Platform.OS === "android") {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  LogBox.ignoreLogs([
    "Accessing the 'state' property of the 'route' object is not supported.",
    "Setting a timer",
    "Calling getNode() on the ref of an Animated component",
    "Native splash screen is already hidden",
    "No Native splash screen",
    "RCTBridge required dispatch_sync to load",
    "Require cycle",
    "new NativeEventEmitter",
    "EventEmitter.removeListener(",
  ]);

  const { appState } = useAppState();
  const dispatch = useAppDispatch();

  const { lastIdle, isPinRequired, authInterval, isRestored, isLocked } = useSelector(
    (state: RootState) => state.app,
  );

  useMount(() => {
    dispatch(restoreAppSettings());
  });

  useEffect(() => {
    MapboxGL.setAccessToken(Config.MAPBOX_ACCESS_TOKEN);
  }, [dispatch]);

  // handle app state changes
  useEffect(() => {
    if (appState === "background" && !isLocked) {
      dispatch(appSlice.actions.updateLastIdle());
      return;
    }

    const isActive = appState === "active";
    const now = Date.now();
    const expiration = now - authInterval;
    const lastIdleExpired = lastIdle && expiration > lastIdle;

    // pin is required and last idle is past user interval, lock the screen
    const shouldLock = isActive && isPinRequired && lastIdleExpired;

    if (shouldLock) {
      dispatch(appSlice.actions.lock(true));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appState]);

  // hide splash screen
  useAsync(async () => {
    if (isRestored) {
      await hideAsync();
    }
  }, [isRestored]);

  useEffect(() => {
    // Hide splash after 5 seconds, deal with the consequences?
    const timeout = setTimeout(() => {
      hideAsync();
    }, 5000);
    return () => clearInterval(timeout);
  }, [dispatch]);

  return (
    <OnboardingProvider baseUrl={Config.ONBOARDING_SERVER_URL}>
      <ThemeProvider theme={theme}>
        <BottomSheetModalProvider>
          <SafeAreaProvider>
            {Platform.OS === "ios" && <StatusBar barStyle="dark-content" />}
            {Platform.OS === "android" && (
              <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
            )}
            <NavigationContainer ref={navigationRef}>
              <NavigationRoot />
            </NavigationContainer>
          </SafeAreaProvider>
        </BottomSheetModalProvider>
      </ThemeProvider>
    </OnboardingProvider>
  );
};

export default memo(App);
