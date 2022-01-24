import React, { useCallback } from 'react'
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'

import { Button } from '../components/Button'
import { SignedInStackNavigationProp } from './navigationRootTypes'
import useDefaultScreenOptions from './useDefaultScreenOptions'
import AskSetLocationScreen from '../features/gateways/onboarding/AskSetLocationScreen'
import PickLocationScreen from '../features/gateways/onboarding/PickLocationScreen'
import TxnProgressScreen from '../features/gateways/onboarding/TxnProgressScreen'
import ConfirmLocationScreen from '../features/gateways/onboarding/ConfirmLocationScreen'
import SkipLocationScreen from '../features/gateways/onboarding/SkipLocationScreen'
import AntennaSetupScreen from '../features/gateways/onboarding/AntennaSetupScreen'
import TxnConfirmScreen from '../features/gateways/onboarding/TxnConfirmScreen'
import TxnSubmitedScreen from '../features/gateways/onboarding/TxnSubmitedScreen'
import { GatewayOnboardingStackParamList } from './gatewayOnboardingNavigatorTypes'

const Stack = createStackNavigator<GatewayOnboardingStackParamList>()

const GatewayOnboardingNavigator = () => {
  const { t } = useTranslation()
  const rootNavigation = useNavigation<SignedInStackNavigationProp>()

  const defaultScreenOptions = useDefaultScreenOptions()

  const handleCancel = useCallback(() => rootNavigation.navigate('MainTabs'), [
    rootNavigation,
  ])

  return (
    <Stack.Navigator
      screenOptions={({ route }) => {
        const options: StackNavigationOptions = {
          ...defaultScreenOptions,
          title: '',
        }

        const hideBackBtn = route.name === 'TxnSubmitedScreen'
        const hideCancelBtn = route.name === 'TxnProgressScreen' || hideBackBtn

        if (!hideCancelBtn) {
          options.headerRight = () => (
            <Button
              title={t('generic.cancel')}
              onPress={handleCancel}
              color="primary"
              size="small"
              variant="text"
              marginRight="m"
            />
          )
        }

        if (hideBackBtn) {
          options.headerLeft = () => null
        }

        return options
      }}
    >
      <Stack.Screen name="TxnConfirmScreen" component={TxnConfirmScreen} />
      <Stack.Screen
        name="AskSetLocationScreen"
        component={AskSetLocationScreen}
      />
      <Stack.Screen name="PickLocationScreen" component={PickLocationScreen} />
      <Stack.Screen
        name="ConfirmLocationScreen"
        component={ConfirmLocationScreen}
      />
      <Stack.Screen name="AntennaSetupScreen" component={AntennaSetupScreen} />
      <Stack.Screen name="SkipLocationScreen" component={SkipLocationScreen} />
      <Stack.Screen
        name="TxnProgressScreen"
        component={TxnProgressScreen}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen name="TxnSubmitedScreen" component={TxnSubmitedScreen} />
    </Stack.Navigator>
  )
}

export default GatewayOnboardingNavigator
