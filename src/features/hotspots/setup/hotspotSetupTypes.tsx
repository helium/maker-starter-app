import { StackNavigationProp } from '@react-navigation/stack'
import { HotspotType } from '../../../makers'
import { HotspotLink } from '../../../providers/appLinkTypes'

export type HotspotConnectStatus =
  | 'success'
  | 'no_device_found'
  | 'no_services_found'
  | 'invalid_onboarding_address'
  | 'no_onboarding_key'
  | 'service_unavailable'
  | 'details_fetch_failure'

type GatewayAction = 'addGateway' | 'assertLocation' | 'diagnostics' | 'wifi'

export type HotspotSetupStackParamList = {
  HotspotSetupEducationScreen: {
    hotspotType: HotspotType
    gatewayAction: GatewayAction
  }
  HotspotSetupExternalScreen: {
    hotspotType: HotspotType
    gatewayAction: GatewayAction
  }
  HotspotSetupExternalConfirmScreen: {
    addGatewayTxn: string
    hotspotType: HotspotType
    gatewayAction: GatewayAction
  }
  HotspotSetupInstructionsScreen: {
    slideIndex: number
    hotspotType: HotspotType
    gatewayAction: GatewayAction
  }
  HotspotSetupScanningScreen: {
    hotspotType: HotspotType
    gatewayAction: GatewayAction
  }
  HotspotSetupPickHotspotScreen: {
    hotspotType: HotspotType
    gatewayAction: GatewayAction
  }
  OnboardingErrorScreen: { connectStatus: HotspotConnectStatus }
  HotspotSetupDiagnostics: undefined
  HotspotSetupPickWifiScreen: {
    gatewayAction: GatewayAction
    networks: string[]
    connectedNetworks: string[]
    addGatewayTxn: string
    hotspotAddress: string
    hotspotType: HotspotType
  }
  FirmwareUpdateNeededScreen: {
    current: boolean
    minVersion: string
    deviceFirmwareVersion: string
  }
  HotspotSetupWifiScreen: {
    network: string
    addGatewayTxn: string
    hotspotAddress: string
    hotspotType: HotspotType
    gatewayAction: GatewayAction
  }
  HotspotSetupWifiConnectingScreen: {
    network: string
    password: string
    addGatewayTxn: string
    hotspotAddress: string
    hotspotType: HotspotType
    gatewayAction: GatewayAction
  }
  HotspotSetupLocationInfoScreen: {
    hotspotType: HotspotType
    addGatewayTxn: string
    hotspotAddress: string
  }
  HotspotSetupPickLocationScreen: {
    hotspotType: HotspotType
    addGatewayTxn: string
    hotspotAddress: string
  }
  AntennaSetupScreen: {
    hotspotType: HotspotType
    addGatewayTxn: string
    hotspotAddress: string
    coords?: number[]
    locationName?: string
  }
  HotspotSetupConfirmLocationScreen: {
    addGatewayTxn: string
    hotspotAddress: string
    elevation?: number
    gain?: number
    coords?: number[]
    locationName?: string
  }
  HotspotSetupSkipLocationScreen: {
    addGatewayTxn: string
    hotspotAddress: string
    elevation?: number
    gain?: number
  }
  HotspotTxnsProgressScreen: {
    addGatewayTxn: string
    assertLocationTxn?: string
    solanaTransactions?: string[]
    hotspotAddress?: string
    elevation?: number
    gain?: number
    coords?: number[]
  }
  NotHotspotOwnerErrorScreen: undefined
  OwnedHotspotErrorScreen: undefined
  HotspotTxnsSubmitScreen: HotspotLink
}

export type HotspotSetupNavigationProp =
  StackNavigationProp<HotspotSetupStackParamList>
