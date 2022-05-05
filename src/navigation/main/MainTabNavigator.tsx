import React, { useEffect, memo, useMemo, useCallback } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

import HotspotsScreen from "features/hotspots/root/HotspotsScreen";
import SettingsScreen from "features/settings/SettingsScreen";
import { RootState } from "store/rootReducer";
import { SignedInStackNavigationProp } from "navigation/navigationRootTypes";
import useDefaultScreenOptions from "navigation/useDefaultScreenOptions";
import { useColors } from "theme/themeHooks";
import { MainTabParamList } from "./mainTabNavigatorTypes";
import TabBarIcon from "./TabBarIcon";
import { TabBarIconType, MainTabType } from "./tabTypes";

const MainTab = createBottomTabNavigator<MainTabParamList>();

const MainTabs = () => {
  const rootNavigation = useNavigation<SignedInStackNavigationProp>();
  const {
    app: { isLocked },
  } = useSelector((state: RootState) => state);

  const colors = useColors();
  const defaultScreenOptions = useDefaultScreenOptions();

  useEffect(() => {
    if (!isLocked) return;
    rootNavigation.navigate("LockScreen", { requestType: "unlock", lock: true });
  }, [isLocked, rootNavigation]);

  const sceneContainerStyle = useMemo(
    () => ({
      opacity: isLocked ? 0 : 1,
    }),
    [isLocked],
  );

  const screenOptions = useCallback(
    ({ route }) => ({
      ...defaultScreenOptions,
      headerTitle: "",
      tabBarStyle: {
        backgroundColor: colors.primaryBackground,
      },
      tabBarIcon: ({ focused, size }: TabBarIconType) => {
        return (
          <TabBarIcon
            name={route.name as MainTabType}
            focused={focused}
            size={Math.min(size, 22)}
          />
        );
      },
      tabBarActiveTintColor: colors.linkText,
      tabBarInactiveTintColor: colors.ghost,
    }),
    [defaultScreenOptions, colors],
  );

  return (
    <MainTab.Navigator
      sceneContainerStyle={sceneContainerStyle}
      initialRouteName="Hotspots"
      screenOptions={screenOptions}
    >
      <MainTab.Screen name="Hotspots" component={HotspotsScreen} />
      <MainTab.Screen name="Settings" component={SettingsScreen} />
    </MainTab.Navigator>
  );
};

export default memo(MainTabs);
