import { StackNavigationProp } from "@react-navigation/stack";
import { NavigatorScreenParams } from "@react-navigation/native";
import { OnboardingRecord } from "@helium/onboarding";
import { Hotspot } from "@helium/http";

import { Antenna } from "types/Antenna";
import { HotspotOnboardingStackParamList } from "./hotspotOnboardingNavigatorTypes";

export type LockScreenRequestType =
  | "disablePin"
  | "enablePinForPayments"
  | "disablePinForPayments"
  | "resetPin"
  | "unlock";

export type NotSignedInStackParamList = {
  Welcome: undefined;
};

export type NotSignedInStackNavigationProp = StackNavigationProp<NotSignedInStackParamList>;

export type SignedInStackParamList = {
  MainTabs: undefined | { pinVerifiedFor: LockScreenRequestType };

  HotspotDetails: {
    hotspotAddress: string;
  };

  PickNewLocationScreen: {
    onboardingRecord: OnboardingRecord;
    hotspot: Hotspot;
  };
  ConfirmLocationUpdateScreen: {
    onboardingRecord: OnboardingRecord;
    hotspot: Hotspot;
    coords: number[];
    locationName: string;
  };
  PickNewAntennaScreen: {
    onboardingRecord: OnboardingRecord;
    hotspot: Hotspot;
  };
  ConfirmAntennaUpdateScreen: {
    onboardingRecord: OnboardingRecord;
    hotspot: Hotspot;
    antenna: Antenna;
    gain: number;
    elevation: number;
  };

  LockScreen: {
    requestType: LockScreenRequestType;
    lock?: boolean;
  };
  HotspotOnboarding: NavigatorScreenParams<HotspotOnboardingStackParamList>;

  CreatePinScreen: { pinReset?: boolean } | undefined;
  ConfirmPinScreen: {
    pin: string;
    pinReset?: boolean;
  };
};

export type SignedInStackNavigationProp = StackNavigationProp<SignedInStackParamList>;
