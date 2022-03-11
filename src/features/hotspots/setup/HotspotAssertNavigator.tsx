import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import HotspotSetupScanningScreen from './HotspotSetupScanningScreen'
import HotspotSetupPickHotspotScreen from './HotspotSetupPickHotspotScreen'
import defaultScreenOptions from '../../../navigation/defaultScreenOptions'
import HotspotSetupPickLocationScreen from './HotspotSetupPickLocationScreen'
import HotspotTxnsProgressScreen from './HotspotTxnsProgressScreen'
import HotspotSetupConfirmLocationScreen from './HotspotSetupConfirmLocationScreen'
import OnboardingErrorScreen from './OnboardingErrorScreen'
import NotHotspotOwnerError from './NotHotspotOwnerError'
import OwnedHotspotError from './OwnedHotspotError'
import AntennaSetupScreen from './AntennaSetupScreen'
import HotspotTxnsSubmitScreen from './HotspotTxnsSubmitScreen'

const HotspotAssertStack = createStackNavigator()

const HotspotAssert = () => {
  return (
    <HotspotAssertStack.Navigator
      headerMode="none"
      screenOptions={{ ...defaultScreenOptions }}
    >
      <HotspotAssertStack.Screen
        name="HotspotSetupScanningScreen"
        component={HotspotSetupScanningScreen}
        initialParams={{
          hotspotType: 'IlliosHotspotBLE',
          gatewayAction: 'assertLocation',
        }}
      />
      <HotspotAssertStack.Screen
        name="HotspotSetupPickHotspotScreen"
        component={HotspotSetupPickHotspotScreen}
      />
      <HotspotAssertStack.Screen
        name="OnboardingErrorScreen"
        component={OnboardingErrorScreen}
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
    </HotspotAssertStack.Navigator>
  )
}

export default HotspotAssert
