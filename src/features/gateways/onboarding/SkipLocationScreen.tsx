import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'

import Box from '../../../components/Box'
import { DebouncedButton } from '../../../components/Button'
import Text from '../../../components/Text'
import {
  GatewayOnboardingNavigationProp,
  GatewayOnboardingStackParamList,
} from '../../../navigation/gatewayOnboardingNavigatorTypes'

type Route = RouteProp<GatewayOnboardingStackParamList, 'SkipLocationScreen'>

const SkipLocationScreen = () => {
  const { t } = useTranslation()
  const navigation = useNavigation<GatewayOnboardingNavigationProp>()

  const { params } = useRoute<Route>()

  const navNext = useCallback(async () => {
    navigation.replace('TxnProgressScreen', params)
  }, [navigation, params])

  return (
    <Box
      flex={1}
      backgroundColor="primaryBackground"
      paddingHorizontal="m"
      paddingBottom="m"
    >
      <Text variant="h1" marginBottom="l" adjustsFontSizeToFit>
        {t('gatewayOnboarding.skipLocationScreen.title')}
      </Text>

      <Text variant="subtitle1" adjustsFontSizeToFit marginBottom="l">
        {t('gatewayOnboarding.skipLocationScreen.subtitle1')}
      </Text>

      <Text variant="subtitle2" adjustsFontSizeToFit marginBottom="l">
        {t('gatewayOnboarding.skipLocationScreen.subtitle2')}
      </Text>

      <Box flex={1} />

      <DebouncedButton
        title={t('gatewayOnboarding.skipLocationScreen.next')}
        color="primary"
        onPress={navNext}
      />
    </Box>
  )
}

export default SkipLocationScreen
