import { HotspotType as HotspotNetworkType } from '@helium/onboarding'
import { StackNavigationProp } from '@react-navigation/stack'
import { HotspotType as HotspotMakerType } from '../../../makers'
import { HotspotLink } from '../../../providers/appLinkTypes'
import { HotspotConnectStatus } from './hotspotSetupTypes'

export type HotspotAssertStackParamList = {
  HotspotAssertAddressScreen: undefined | { hotspotTypes?: HotspotMakerType[] }

  HotspotSetupPickLocationScreen: {
    hotspotType: HotspotMakerType
    addGatewayTxn?: string
    hotspotAddress: string
    hotspotNetworkTypes?: HotspotNetworkType[]
  }

  HotspotSetupConfirmLocationScreen: {
    addGatewayTxn?: string
    hotspotAddress: string
    elevation?: number
    gain?: number
    coords?: number[]
    locationName?: string
    hotspotNetworkTypes?: HotspotNetworkType[]
  }

  AntennaSetupScreen: {
    hotspotType: HotspotMakerType
    addGatewayTxn?: string
    hotspotAddress: string
    coords?: number[]
    locationName?: string
    hotspotNetworkTypes?: HotspotNetworkType[]
  }

  HotspotTxnsProgressScreen: {
    addGatewayTxn?: string
    assertLocationTxn?: string
    solanaTransactions?: string[]
    hotspotAddress: string
    hotspotNetworkTypes?: HotspotNetworkType[]
  }

  NotHotspotOwnerErrorScreen: undefined

  OwnedHotspotErrorScreen: undefined

  HotspotTxnsSubmitScreen: HotspotLink

  OnboardingErrorScreen: {
    connectStatus?: HotspotConnectStatus
    errorLogs?: string[]
  }
}

export type HotspotAssertNavigationProp =
  StackNavigationProp<HotspotAssertStackParamList>
