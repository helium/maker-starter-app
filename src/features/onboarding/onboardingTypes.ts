import { StackNavigationProp } from '@react-navigation/stack'

export type OnboardingStackParamList = {
  Welcome: undefined
  CreateAccount: undefined
}

export type OnboardingNavigationProp =
  StackNavigationProp<OnboardingStackParamList>
