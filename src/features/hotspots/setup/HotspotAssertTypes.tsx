import { StackNavigationProp } from '@react-navigation/stack'
import { HotspotType } from '../../../makers'
import { HotspotLink } from '../../../providers/appLinkTypes'

export type HotspotAssertStackParamList = {
  HotspotAssertAddressScreen: undefined

  HotspotSetupPickLocationScreen: {
    hotspotType: HotspotType
    addGatewayTxn: string
    hotspotAddress: string
  }

  HotspotSetupConfirmLocationScreen: {
    addGatewayTxn: string
    hotspotAddress: string
    elevation?: number
    gain?: number
    coords?: number[]
    locationName?: string
  }

  AntennaSetupScreen: {
    hotspotType: HotspotType
    addGatewayTxn: string
    hotspotAddress: string
    coords?: number[]
    locationName?: string
  }

  HotspotTxnsProgressScreen: {
    addGatewayTxn: string
    assertLocationTxn: string
    solanaTransactions: string[]
    hotspotAddress: string
  }

  NotHotspotOwnerErrorScreen: undefined

  OwnedHotspotErrorScreen: undefined

  HotspotTxnsSubmitScreen: HotspotLink
}

export type HotspotAssertNavigationProp =
  StackNavigationProp<HotspotAssertStackParamList>
