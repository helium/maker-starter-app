import React from 'react'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { useAsync } from 'react-async-hook'

import Box from '../../../components/Box'
import { DebouncedButton } from '../../../components/Button'
import Text from '../../../components/Text'
import { submitTxn } from '../../../utils/appDataClient'
import { SignedInStackNavigationProp } from '../../../navigation/navigationRootTypes'
import { HotspotOnboardingStackParamList } from '../../../navigation/hotspotOnboardingNavigatorTypes'

type Route = RouteProp<HotspotOnboardingStackParamList, 'TxnSubmitedScreen'>

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
      paddingBottom="l"
    >
      <Box flex={1} alignItems="center" justifyContent="center">
        <Text
          variant="h3"
          marginBottom="xl"
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          {t('hotspotOnboarding.txnSubmitedScreen.title')}
        </Text>

        <Text variant="body1" textAlign="center">
          {t('hotspotOnboarding.txnSubmitedScreen.subtitle')}
        </Text>
      </Box>

      <DebouncedButton
        onPress={() => navigation.navigate('MainTabs')}
        color="primary"
        title={t('hotspotOnboarding.txnSubmitedScreen.next')}
        fullWidth
      />
    </Box>
  )
}

export default TxnSubmitedScreen
