import { StackNavigationProp } from '@react-navigation/stack'
import { NavigatorScreenParams } from '@react-navigation/native'

import { HotspotOnboardingStackParamList } from './hotspotOnboardingNavigatorTypes'

export type LockScreenRequestType =
  | 'disablePin'
  | 'enablePinForPayments'
  | 'disablePinForPayments'
  | 'resetPin'
  | 'unlock'

export type NotSignedInStackParamList = {
  Welcome: undefined
}

export type NotSignedInStackNavigationProp = StackNavigationProp<NotSignedInStackParamList>

export type SignedInStackParamList = {
  MainTabs: undefined | { pinVerifiedFor: LockScreenRequestType }

  HotspotDetails: {
    walletAddress: string
    hotspotAddress: string
  }

  LockScreen: {
    requestType: LockScreenRequestType
    lock?: boolean
  }
  HotspotOnboarding: NavigatorScreenParams<HotspotOnboardingStackParamList>

  CreatePinScreen: { pinReset?: boolean } | undefined
  ConfirmPinScreen: {
    pin: string
    pinReset?: boolean
  }
}

export type SignedInStackNavigationProp = StackNavigationProp<SignedInStackParamList>
