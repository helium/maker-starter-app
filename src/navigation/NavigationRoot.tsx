import React, { memo, useEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { useSelector } from 'react-redux'
import changeNavigationBarColor from 'react-native-navigation-bar-color'

import { RootState } from '../store/rootReducer'
import LockScreen from '../features/lock/LockScreen'
import GatewayOnboardingNavigator from './GatewayOnboardingNavigator'
import MainTabs from './main/MainTabNavigator'
import { useColors } from '../theme/themeHooks'
import WelcomeScreen from '../features/notSignedIn/WelcomeScreen'
import CreatePinScreen from '../features/pinManagement/CreatePinScreen'
import ConfirmPinScreen from '../features/pinManagement/ConfirmPinScreen'
import {
  NotSignedInStackParamList,
  SignedInStackParamList,
} from './navigationRootTypes'
import useDefaultScreenOptions from './useDefaultScreenOptions'

const NotSignedInStack = createStackNavigator<NotSignedInStackParamList>()
const SignedInStack = createStackNavigator<SignedInStackParamList>()

const NavigationRoot = () => {
  const { walletLinkToken } = useSelector((state: RootState) => state.app)
  const colors = useColors()
  const defaultScreenOptions = useDefaultScreenOptions()

  useEffect(() => {
    changeNavigationBarColor(colors.primaryText, true, false)
  }, [colors.primaryText])

  const notSignedIn = !walletLinkToken

  if (notSignedIn) {
    return (
      <NotSignedInStack.Navigator
        screenOptions={{
          ...defaultScreenOptions,
          gestureEnabled: false,
          title: '',
        }}
      >
        <NotSignedInStack.Screen name="Welcome" component={WelcomeScreen} />
      </NotSignedInStack.Navigator>
    )
  }

  return (
    <SignedInStack.Navigator
      screenOptions={{ gestureEnabled: false, headerShown: false }}
    >
      <SignedInStack.Screen name="MainTabs" component={MainTabs} />

      <SignedInStack.Screen
        name="GatewayOnboarding"
        component={GatewayOnboardingNavigator}
      />

      <SignedInStack.Screen
        name="CreatePinScreen"
        component={CreatePinScreen}
      />
      <SignedInStack.Screen
        name="ConfirmPinScreen"
        component={ConfirmPinScreen}
      />

      <SignedInStack.Screen name="LockScreen" component={LockScreen} />
    </SignedInStack.Navigator>
  )
}

export default memo(NavigationRoot)
