import React, { memo } from 'react'
import { Platform } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import LockScreen from '../../features/lock/LockScreen'
import defaultScreenOptions from '../defaultScreenOptions'
import HotspotSetup from '../../features/hotspots/setup/HotspotSetupNavigator'
import MainTabs from './MainTabNavigator'
import HotspotAssert from '../../features/hotspots/setup/HotspotAssertNavigator'
import TransferHotspotNavigator from '../../features/transferHotspot/TransferHotspotNavigator'

const HomeStack = createStackNavigator()

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator
      mode="modal"
      screenOptions={({ route }) => {
        if (route.name === 'LockScreen')
          return { ...defaultScreenOptions, gestureEnabled: false }

        if (Platform.OS === 'android') return defaultScreenOptions
        return {}
      }}
    >
      <HomeStack.Screen
        name="MainTabs"
        options={{ headerShown: false }}
        component={MainTabs}
      />
      <HomeStack.Screen
        name="HotspotSetup"
        component={HotspotSetup}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <HomeStack.Screen
        name="HotspotAssert"
        component={HotspotAssert}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <HomeStack.Screen
        name="TransferHotspot"
        component={TransferHotspotNavigator}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <HomeStack.Screen
        name="LockScreen"
        component={LockScreen}
        options={{ headerShown: false }}
      />
    </HomeStack.Navigator>
  )
}

export default memo(HomeStackScreen)
