import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { DebouncedButton } from '../../../components/Button'
import Text from '../../../components/Text'
import {
  HotspotSetupNavigationProp,
  HotspotSetupStackParamList,
} from './hotspotSetupTypes'
import Box from '../../../components/Box'
import BackScreen from '../../../components/BackScreen'
import { RootNavigationProp } from '../../../navigation/main/tabTypes'
import useGetLocation from '../../../utils/useGetLocation'

type Route = RouteProp<
  HotspotSetupStackParamList,
  'HotspotSetupLocationInfoScreen'
>

const HotspotSetupLocationInfoScreen = () => {
  const { t } = useTranslation()
  const { params } = useRoute<Route>()
  const navigation = useNavigation<HotspotSetupNavigationProp>()
  const rootNav = useNavigation<RootNavigationProp>()
  const maybeGetLocation = useGetLocation()

  const handleClose = useCallback(() => rootNav.navigate('MainTabs'), [rootNav])

  const checkLocationPermissions = async () => {
    await maybeGetLocation(true)
    navigation.navigate('HotspotSetupPickLocationScreen', params)
  }

  const skipLocationAssert = () => {
    navigation.navigate('HotspotSetupSkipLocationScreen', params)
  }

  return (
    <BackScreen
      onClose={handleClose}
      backgroundColor="primaryBackground"
      padding="l"
    >
      <Text
        variant="h1"
        marginVertical="l"
        maxFontSizeMultiplier={1}
        numberOfLines={2}
        adjustsFontSizeToFit
      >
        {t('hotspot_setup.enable_location.title')}
      </Text>
      <Text
        variant="subtitle1"
        marginBottom="l"
        maxFontSizeMultiplier={1.1}
        numberOfLines={3}
        adjustsFontSizeToFit
      >
        {t('hotspot_setup.enable_location.subtitle')}
      </Text>
      <Text
        variant="body1"
        numberOfLines={2}
        adjustsFontSizeToFit
        maxFontSizeMultiplier={1.2}
      >
        {t('hotspot_setup.enable_location.p_1')}
      </Text>
      <Box flex={1} />
      <DebouncedButton
        onPress={checkLocationPermissions}
        variant="primary"
        mode="contained"
        title={t('hotspot_setup.enable_location.next')}
      />
      <DebouncedButton
        onPress={skipLocationAssert}
        variant="primary"
        mode="text"
        title={t('hotspot_setup.enable_location.cancel')}
      />
    </BackScreen>
  )
}

export default HotspotSetupLocationInfoScreen
