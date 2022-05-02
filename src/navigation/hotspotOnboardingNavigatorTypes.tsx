import { OnboardingRecord } from "@helium/onboarding";
import { StackNavigationProp } from "@react-navigation/stack";

export type HotspotOnboardingStackParamList = {
  TxnConfirmScreen: {
    addGatewayTxn: string;
  };
  AskSetLocationScreen: {
    addGatewayTxn?: string;
    hotspotAddress: string;
    onboardingRecord: OnboardingRecord;
  };
  PickLocationScreen: {
    addGatewayTxn?: string;
    hotspotAddress: string;
    onboardingRecord: OnboardingRecord;
  };
  ConfirmLocationScreen: {
    addGatewayTxn?: string;
    hotspotAddress: string;
    onboardingRecord: OnboardingRecord;
    elevation?: number;
    gain?: number;
    coords?: number[];
    locationName?: string;
  };
  AntennaSetupScreen: {
    addGatewayTxn?: string;
    hotspotAddress: string;
    onboardingRecord: OnboardingRecord;
    coords?: number[];
    locationName?: string;
  };
  SkipLocationScreen: {
    addGatewayTxn?: string;
    hotspotAddress: string;
    onboardingRecord: OnboardingRecord;
    elevation?: number;
    gain?: number;
  };
  TxnProgressScreen: {
    addGatewayTxn?: string;
    hotspotAddress: string;
    onboardingRecord: OnboardingRecord;
    elevation?: number;
    gain?: number;
    coords?: number[];
    locationName?: string;
  };
  TxnSubmitedScreen: {
    assertTxn?: string;
    gatewayTxn?: string;
    gatewayAddress?: string;
  };
};

export type HotspotOnboardingNavigationProp = StackNavigationProp<HotspotOnboardingStackParamList>;
