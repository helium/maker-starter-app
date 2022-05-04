import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

import { LockScreenRequestType } from "../navigationRootTypes";

export type MainTabParamList = {
  Hotspots: undefined;
  Settings: undefined | { pinVerifiedFor: LockScreenRequestType };
};

export type MainTabNavigationProp = BottomTabNavigationProp<MainTabParamList>;
