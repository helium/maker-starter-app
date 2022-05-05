import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

import { LockScreenRequestType } from "navigation/navigationRootTypes";

export type MainTabParamList = {
  Hotspots: undefined;
  Settings: undefined | { pinVerifiedFor: LockScreenRequestType };
};

export type MainTabNavigationProp = BottomTabNavigationProp<MainTabParamList>;
