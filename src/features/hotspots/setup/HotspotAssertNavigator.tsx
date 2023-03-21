import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import defaultScreenOptions from '../../../navigation/defaultScreenOptions'
import HotspotSetupPickLocationScreen from './HotspotSetupPickLocationScreen'
import HotspotTxnsProgressScreen from './HotspotTxnsProgressScreen'
import HotspotSetupConfirmLocationScreen from './HotspotSetupConfirmLocationScreen'
import NotHotspotOwnerError from './NotHotspotOwnerError'
import OwnedHotspotError from './OwnedHotspotError'
import AntennaSetupScreen from './AntennaSetupScreen'
import HotspotTxnsSubmitScreen from './HotspotTxnsSubmitScreen'
import HotspotAssertAddressScreen from './HotspotAssertAddressScreen'
import OnboardingErrorScreen from './OnboardingErrorScreen'

const HotspotAssertStack = createStackNavigator()

const HotspotAssert = () => {
  return (
    <HotspotAssertStack.Navigator
      headerMode="none"
      screenOptions={{ ...defaultScreenOptions }}
    >
      <HotspotAssertStack.Screen
        name="HotspotAssertAddressScreen"
        component={HotspotAssertAddressScreen}
      />
      <HotspotAssertStack.Screen
        name="HotspotSetupPickLocationScreen"
        component={HotspotSetupPickLocationScreen}
      />
      <HotspotAssertStack.Screen
        name="HotspotSetupConfirmLocationScreen"
        component={HotspotSetupConfirmLocationScreen}
      />
      <HotspotAssertStack.Screen
        name="AntennaSetupScreen"
        component={AntennaSetupScreen}
      />
      <HotspotAssertStack.Screen
        name="HotspotTxnsProgressScreen"
        component={HotspotTxnsProgressScreen}
        options={{ gestureEnabled: false }}
      />
      <HotspotAssertStack.Screen
        name="NotHotspotOwnerErrorScreen"
        component={NotHotspotOwnerError}
      />
      <HotspotAssertStack.Screen
        name="OwnedHotspotErrorScreen"
        component={OwnedHotspotError}
      />
      <HotspotAssertStack.Screen
        name="HotspotTxnsSubmitScreen"
        component={HotspotTxnsSubmitScreen}
      />
      <HotspotAssertStack.Screen
        name="OnboardingErrorScreen"
        component={OnboardingErrorScreen}
      />
    </HotspotAssertStack.Navigator>
  )
}

export default HotspotAssert
