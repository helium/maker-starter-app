import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { Platform } from 'react-native'
import WelcomeScreen from './welcome/WelcomeScreen'
import { OnboardingStackParamList } from './onboardingTypes'
import DefaultScreenOptions from '../../navigation/defaultScreenOptions'
import LinkAccount from './LinkAccount'
import CreateAccount from './CreateAccount'

const OnboardingStack = createStackNavigator<OnboardingStackParamList>()
const Onboarding = () => {
  return (
    <OnboardingStack.Navigator
      headerMode="none"
      screenOptions={
        Platform.OS === 'android' ? DefaultScreenOptions : undefined
      }
      mode={Platform.OS === 'android' ? 'modal' : undefined}
    >
      <OnboardingStack.Screen name="Welcome" component={WelcomeScreen} />

      <OnboardingStack.Screen name="LinkAccount" component={LinkAccount} />
      <OnboardingStack.Screen name="CreateAccount" component={CreateAccount} />
    </OnboardingStack.Navigator>
  )
}

export default Onboarding
