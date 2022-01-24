import { StackNavigationProp } from '@react-navigation/stack'
import { NavigatorScreenParams } from '@react-navigation/native'

import { GatewayOnboardingStackParamList } from './gatewayOnboardingNavigatorTypes'

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
  Welcome: undefined

  MainTabs: undefined | { pinVerifiedFor: LockScreenRequestType }
  LockScreen: {
    requestType: LockScreenRequestType
    lock?: boolean
  }
  GatewayOnboarding: NavigatorScreenParams<GatewayOnboardingStackParamList>

  CreatePinScreen: { pinReset?: boolean } | undefined
  ConfirmPinScreen: {
    pin: string
    pinReset?: boolean
  }
}

export type SignedInStackNavigationProp = StackNavigationProp<SignedInStackParamList>
