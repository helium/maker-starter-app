import { StackNavigationProp } from '@react-navigation/stack'
import { Onboarding } from '@helium/react-native-sdk'
import { HotspotType } from '../../../makers'

export type HotspotConnectStatus =
  | 'success'
  | 'no_device_found'
  | 'no_services_found'
  | 'invalid_onboarding_address'
  | 'no_onboarding_key'
  | 'service_unavailable'
  | 'details_fetch_failure'

export type HotspotSetupStackParamList = {
  HotspotSetupSelectionScreen: undefined
  HotspotSetupEducationScreen: { hotspotType: HotspotType }
  HotspotSetupExternalScreen: { hotspotType: HotspotType }
  HotspotSetupExternalConfirmScreen: {
    addGatewayTxn: string
  }
  HotspotSetupDiagnosticsScreen: { hotspotType: HotspotType }
  HotspotSetupPowerScreen: { hotspotType: HotspotType }
  HotspotSetupBluetoothInfoScreen: { hotspotType: HotspotType }
  HotspotSetupScanningScreen: { hotspotType: HotspotType }
  HotspotSetupPickHotspotScreen: { hotspotType: HotspotType }
  HotspotSetupConnectingScreen: { hotspotId: string }
  OnboardingErrorScreen: { connectStatus: HotspotConnectStatus }
  HotspotSetupPickWifiScreen: {
    networks: string[]
    connectedNetworks: string[]
  }
  FirmwareUpdateNeededScreen: undefined
  HotspotSetupWifiScreen: { network: string }
  HotspotSetupWifiConnectingScreen: { network: string; password: string }
  HotspotSetupLocationInfoScreen:
    | {
        addGatewayTxn: string
        hotspotAddress: string
        onboardingRecord: Onboarding.OnboardingRecord
      }
    | undefined
  HotspotSetupPickLocationScreen:
    | {
        addGatewayTxn: string
        hotspotAddress: string
        onboardingRecord: Onboarding.OnboardingRecord
      }
    | undefined
  AntennaSetupScreen:
    | {
        addGatewayTxn: string
        hotspotAddress: string
        onboardingRecord: Onboarding.OnboardingRecord
      }
    | undefined
  HotspotSetupConfirmLocationScreen:
    | {
        addGatewayTxn: string
        hotspotAddress: string
        onboardingRecord: Onboarding.OnboardingRecord
      }
    | undefined
  HotspotSetupSkipLocationScreen:
    | {
        addGatewayTxn: string
        hotspotAddress: string
        onboardingRecord: Onboarding.OnboardingRecord
      }
    | undefined
  HotspotTxnsProgressScreen:
    | {
        addGatewayTxn: string
        hotspotAddress: string
        onboardingRecord: Onboarding.OnboardingRecord
      }
    | undefined
  NotHotspotOwnerErrorScreen: undefined
  OwnedHotspotErrorScreen: undefined
}

export type HotspotSetupNavigationProp = StackNavigationProp<HotspotSetupStackParamList>
