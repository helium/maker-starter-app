import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { Platform } from 'react-native'
import WelcomeScreen from './welcome/WelcomeScreen'
import { OnboardingStackParamList } from './onboardingTypes'
import DefaultScreenOptions from '../../navigation/defaultScreenOptions'
import HotspotSetupScanningScreen from '../hotspots/setup/HotspotSetupScanningScreen'
import HotspotSetupPickHotspotScreen from '../hotspots/setup/HotspotSetupPickHotspotScreen'
import HotspotSetupDiagnosticsScreen from '../hotspots/setup/HotspotSetupDiagnosticsScreen'

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

      <OnboardingStack.Screen
        name="HotspotSetupScanningScreen"
        component={HotspotSetupScanningScreen}
      />
      <OnboardingStack.Screen
        name="HotspotSetupPickHotspotScreen"
        component={HotspotSetupPickHotspotScreen}
      />
      <OnboardingStack.Screen
        name="HotspotSetupDiagnostics"
        component={HotspotSetupDiagnosticsScreen}
      />
    </OnboardingStack.Navigator>
  )
}

export default Onboarding
