import React from 'react'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'

import { DebouncedButton } from '../../../components/Button'
import Text from '../../../components/Text'
import useGetLocation from '../../../utils/useGetLocation'
import {
  HotspotOnboardingNavigationProp,
  HotspotOnboardingStackParamList,
} from '../../../navigation/hotspotOnboardingNavigatorTypes'
import Box from '../../../components/Box'

type Route = RouteProp<HotspotOnboardingStackParamList, 'AskSetLocationScreen'>

const AskSetLocationScreen = () => {
  const { t } = useTranslation()
  const { params } = useRoute<Route>()
  const navigation = useNavigation<HotspotOnboardingNavigationProp>()
  const maybeGetLocation = useGetLocation()

  const checkLocationPermissions = async () => {
    await maybeGetLocation(true)
    navigation.navigate('PickLocationScreen', params)
  }

  const skipLocationAssert = () => {
    navigation.navigate('SkipLocationScreen', params)
  }

  return (
    <Box
      flex={1}
      backgroundColor="primaryBackground"
      paddingHorizontal="m"
      paddingBottom="m"
    >
      <Text
        variant="h1"
        numberOfLines={1}
        adjustsFontSizeToFit
        marginBottom="l"
      >
        {t('hotspotOnboarding.askSetLocationScreen.title')}
      </Text>

      <Text
        variant="subtitle1"
        marginBottom="l"
        numberOfLines={3}
        adjustsFontSizeToFit
      >
        {t('hotspotOnboarding.askSetLocationScreen.subtitle')}
      </Text>

      <Text
        variant="body1"
        numberOfLines={2}
        adjustsFontSizeToFit
        maxFontSizeMultiplier={1.2}
      >
        {t('hotspotOnboarding.askSetLocationScreen.p1')}
      </Text>

      <Box flex={1} />

      <DebouncedButton
        onPress={checkLocationPermissions}
        color="primary"
        title={t('hotspotOnboarding.askSetLocationScreen.next')}
        marginBottom="m"
      />
      <DebouncedButton
        onPress={skipLocationAssert}
        color="secondary"
        title={t('hotspotOnboarding.askSetLocationScreen.cancel')}
      />
    </Box>
  )
}

export default AskSetLocationScreen