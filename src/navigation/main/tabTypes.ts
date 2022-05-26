import { StackNavigationProp } from '@react-navigation/stack'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { NavigatorScreenParams } from '@react-navigation/native'
import { HotspotLink } from '../../providers/appLinkTypes'

export type MainTabType = 'Hotspots' | 'More' | 'Support'

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

export type HotspotAddressParam = {
  hotspotAddress?: string
}

export type HotspotAssertNavParam = {
  HotspotSetupPickLocationScreen: HotspotAddressParam
}

export type RootStackParamList = {
  MainTabs: undefined | { pinVerifiedFor: LockScreenRequestType }
  LockScreen: {
    requestType: LockScreenRequestType
    lock?: boolean
  }
  HotspotSetup: undefined
  HotspotAssert: NavigatorScreenParams<HotspotAssertNavParam>
  ScanStack: undefined
  TransferHotspot: HotspotLink | HotspotAddressParam | undefined
}

export type RootNavigationProp = StackNavigationProp<RootStackParamList>

export type MainTabParamList = {
  Hotspots: undefined
  Wallet: undefined
  Notifications: undefined
  More: undefined
}

export type MainTabNavigationProp = BottomTabNavigationProp<MainTabParamList>
