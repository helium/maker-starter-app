import React from 'react'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { useAsync } from 'react-async-hook'

import Box from '../../../components/Box'
import { DebouncedButton } from '../../../components/Button'
import Text from '../../../components/Text'
import { submitTxn } from '../../../utils/appDataClient'
import { SignedInStackNavigationProp } from '../../../navigation/navigationRootTypes'
import { GatewayOnboardingStackParamList } from '../../../navigation/gatewayOnboardingNavigatorTypes'

type Route = RouteProp<GatewayOnboardingStackParamList, 'TxnSubmitedScreen'>

const TxnSubmitedScreen = () => {
  const { t } = useTranslation()
  const { params } = useRoute<Route>()
  const navigation = useNavigation<SignedInStackNavigationProp>()

  useAsync(async () => {
    if (params.gatewayTxn) {
      await submitTxn(params.gatewayTxn)
    }

    if (params.assertTxn) {
      await submitTxn(params.assertTxn)
    }
  }, [])

  return (
    <Box
      flex={1}
      backgroundColor="primaryBackground"
      paddingHorizontal="m"
      paddingBottom="m"
    >
      <Box flex={1} alignItems="center">
        <Text variant="subtitle1" marginBottom="l">
          {t('gatewayOnboarding.txnSubmitedScreen.title')}
        </Text>

        <Text variant="body1" textAlign="center" marginBottom="l">
          {t('gatewayOnboarding.txnSubmitedScreen.subtitle')}
        </Text>
      </Box>

      <DebouncedButton
        onPress={() => navigation.navigate('MainTabs')}
        color="primary"
        fullWidth
        title={t('gatewayOnboarding.txnSubmitedScreen.next')}
      />
    </Box>
  )
}

export default TxnSubmitedScreen
