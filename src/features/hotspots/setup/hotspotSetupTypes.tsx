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
    hotspotType: HotspotType
  }
  HotspotSetupInstructionsScreen: {
    slideIndex: number
    hotspotType: HotspotType
  }
  HotspotSetupScanningScreen: { hotspotType: HotspotType }
  HotspotSetupPickHotspotScreen: { hotspotType: HotspotType }
  OnboardingErrorScreen: { connectStatus: HotspotConnectStatus }
  HotspotSetupPickWifiScreen: {
    networks: string[]
    connectedNetworks: string[]
    addGatewayTxn?: string
    hotspotAddress: string
    onboardingRecord: Onboarding.OnboardingRecord
    hotspotType: HotspotType
  }
  FirmwareUpdateNeededScreen: {
    current: boolean
    minVersion: string
    deviceFirmwareVersion: string
  }
  HotspotSetupWifiScreen: {
    network: string
    addGatewayTxn?: string
    hotspotAddress: string
    onboardingRecord: Onboarding.OnboardingRecord
    hotspotType: HotspotType
  }
  HotspotSetupWifiConnectingScreen: {
    network: string
    password: string
    addGatewayTxn?: string
    hotspotAddress: string
    onboardingRecord: Onboarding.OnboardingRecord
    hotspotType: HotspotType
  }
  HotspotSetupLocationInfoScreen: {
    hotspotType: HotspotType
    addGatewayTxn?: string
    hotspotAddress: string
    onboardingRecord: Onboarding.OnboardingRecord
  }
  HotspotSetupPickLocationScreen: {
    hotspotType: HotspotType
    addGatewayTxn?: string
    hotspotAddress: string
    onboardingRecord: Onboarding.OnboardingRecord
  }
  AntennaSetupScreen: {
    hotspotType: HotspotType
    addGatewayTxn?: string
    hotspotAddress: string
    onboardingRecord: Onboarding.OnboardingRecord
    coords?: number[]
    locationName?: string
  }
  HotspotSetupConfirmLocationScreen: {
    addGatewayTxn?: string
    hotspotAddress: string
    onboardingRecord: Onboarding.OnboardingRecord
    elevation?: number
    gain?: number
    coords?: number[]
    locationName?: string
  }
  HotspotSetupSkipLocationScreen: {
    addGatewayTxn?: string
    hotspotAddress: string
    onboardingRecord: Onboarding.OnboardingRecord
    elevation?: number
    gain?: number
  }
  HotspotTxnsProgressScreen: {
    addGatewayTxn?: string
    hotspotAddress: string
    onboardingRecord: Onboarding.OnboardingRecord
    elevation?: number
    gain?: number
    coords?: number[]
    locationName?: string
  }
  NotHotspotOwnerErrorScreen: undefined
  OwnedHotspotErrorScreen: undefined
}

export type HotspotSetupNavigationProp = StackNavigationProp<HotspotSetupStackParamList>
