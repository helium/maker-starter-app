import { StackNavigationProp } from '@react-navigation/stack'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { HotspotLink } from '../../providers/appLinkTypes'

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

export type RootStackParamList = {
  MainTabs: undefined | { pinVerifiedFor: LockScreenRequestType }
  LockScreen: {
    requestType: LockScreenRequestType
    lock?: boolean
  }
  HotspotSetup: undefined
  HotspotAssert: undefined
  ScanStack: undefined
  TransferHotspot: Partial<HotspotLink & { hotspotAddress: string }> | undefined
}

export type RootNavigationProp = StackNavigationProp<RootStackParamList>

export type MainTabParamList = {
  Hotspots: undefined
  Wallet: undefined
  Notifications: undefined
  More: undefined
}

export type MainTabNavigationProp = BottomTabNavigationProp<MainTabParamList>
