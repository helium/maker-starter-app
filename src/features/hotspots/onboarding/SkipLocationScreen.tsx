import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'

import Box from '../../../components/Box'
import { DebouncedButton } from '../../../components/Button'
import Text from '../../../components/Text'
import {
  HotspotOnboardingNavigationProp,
  HotspotOnboardingStackParamList,
} from '../../../navigation/hotspotOnboardingNavigatorTypes'

type Route = RouteProp<HotspotOnboardingStackParamList, 'SkipLocationScreen'>

const SkipLocationScreen = () => {
  const { t } = useTranslation()
  const navigation = useNavigation<HotspotOnboardingNavigationProp>()

  const { params } = useRoute<Route>()

  const navNext = useCallback(async () => {
    navigation.replace('TxnProgressScreen', params)
  }, [navigation, params])

  return (
    <Box
      flex={1}
      backgroundColor="primaryBackground"
      paddingHorizontal="m"
      paddingBottom="l"
    >
      <Text variant="h1" marginBottom="l" adjustsFontSizeToFit>
        {t('hotspotOnboarding.skipLocationScreen.title')}
      </Text>

      <Text variant="subtitle1" adjustsFontSizeToFit marginBottom="l">
        {t('hotspotOnboarding.skipLocationScreen.subtitle1')}
      </Text>

      <Text variant="subtitle2" adjustsFontSizeToFit marginBottom="l">
        {t('hotspotOnboarding.skipLocationScreen.subtitle2')}
      </Text>

      <Box flex={1} />

      <DebouncedButton
        title={t('hotspotOnboarding.skipLocationScreen.next')}
        color="primary"
        onPress={navNext}
      />
    </Box>
  )
}

export default SkipLocationScreen
