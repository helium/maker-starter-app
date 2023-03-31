import { StackNavigationProp } from '@react-navigation/stack'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { HotspotType as HotspotNetworkType } from '@helium/onboarding'
import { HotspotLink } from '../../providers/appLinkTypes'
import { HotspotType as HotspotMakerType } from '../../makers'

export type MainTabType = 'Hotspots' | 'More'

export type TabBarIconType = {
  focused: boolean
  color: string
  size: number
}

export type LockScreenRequestType =
  | 'disablePin'
  | 'enablePinForPayments'
  | 'disablePinForPayments'
  | 'resetPin'
  | 'unlock'
  | 'revealWords'
  | 'revealPrivateKey'

export type RootStackParamList = {
  MainTabs: undefined | { pinVerifiedFor: LockScreenRequestType }
  LockScreen: {
    requestType: LockScreenRequestType
    lock?: boolean
  }
  HotspotSetup: undefined
  HotspotAssert:
    | undefined
    | {
        screen: 'HotspotSetupPickLocationScreen'
        params: {
          hotspotType: HotspotMakerType
          addGatewayTxn?: string
          hotspotAddress: string
          hotspotNetworkTypes?: HotspotNetworkType[]
        }
      }

  ScanStack: undefined
  TransferHotspot: Partial<HotspotLink & { hotspotAddress: string }> | undefined
  MigrationOnboard: undefined
}

export type RootNavigationProp = StackNavigationProp<RootStackParamList>

export type MainTabParamList = {
  Hotspots: undefined
  Wallet: undefined
  Notifications: undefined
  More: undefined
}

export type MainTabNavigationProp = BottomTabNavigationProp<MainTabParamList>
