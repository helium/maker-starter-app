import { StackNavigationProp } from '@react-navigation/stack'

export type OnboardingStackParamList = {
  Welcome: undefined
  LinkAccount: undefined
  CreateAccount: undefined
}

export type OnboardingNavigationProp =
  StackNavigationProp<OnboardingStackParamList>
