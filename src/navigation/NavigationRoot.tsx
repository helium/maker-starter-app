import React, { memo, useEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { useSelector } from 'react-redux'
import changeNavigationBarColor from 'react-native-navigation-bar-color'
import Onboarding from '../features/onboarding/OnboardingNavigator'
import { RootState } from '../store/rootReducer'
import defaultScreenOptions from './defaultScreenOptions'
import HomeNav from './main/HomeNavigator'
import { useColors } from '../theme/themeHooks'

const OnboardingStack = createStackNavigator()
const MainStack = createStackNavigator()

const NavigationRoot = () => {
  const { isLoggedIn } = useSelector((state: RootState) => state.app)
  const colors = useColors()

  useEffect(() => {
    changeNavigationBarColor(colors.purpleDark, true, false)
  }, [colors.purpleDark])

  if (!isLoggedIn) {
    return (
      <OnboardingStack.Navigator
        headerMode="none"
        screenOptions={defaultScreenOptions}
      >
        <OnboardingStack.Screen
          name="Onboarding"
          component={Onboarding}
          options={{ gestureEnabled: false }}
        />
      </OnboardingStack.Navigator>
    )
  }

  return (
    <MainStack.Navigator headerMode="none" screenOptions={defaultScreenOptions}>
      <MainStack.Screen name="MainTab" component={HomeNav} />
    </MainStack.Navigator>
  )
}

export default memo(NavigationRoot)
