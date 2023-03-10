import React, { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { getCountry } from 'react-native-localize'
import { KeyboardAvoidingView, StyleSheet } from 'react-native'
import Box from '../../../components/Box'
import {
  HotspotSetupNavigationProp,
  HotspotSetupStackParamList,
} from './hotspotSetupTypes'
import BackScreen from '../../../components/BackScreen'
import Text from '../../../components/Text'
import { DebouncedButton } from '../../../components/Button'
import HotspotConfigurationPicker from '../../../components/HotspotConfigurationPicker'
import { MakerAntenna } from '../../../makers/antennaMakerTypes'
import Example from '../../../makers/example'
import { HotspotMakerModels } from '../../../makers'
import { RootNavigationProp } from '../../../navigation/main/tabTypes'

type Route = RouteProp<HotspotSetupStackParamList, 'AntennaSetupScreen'>

const AntennaSetupScreen = () => {
  const { t } = useTranslation()
  const navigation = useNavigation<HotspotSetupNavigationProp>()
  const rootNav = useNavigation<RootNavigationProp>()
  const { params } = useRoute<Route>()

  const handleClose = useCallback(() => rootNav.navigate('MainTabs'), [rootNav])

  const defaultAntenna = useMemo(() => {
    const country = getCountry()
    const isUS = country === 'US'
    const makerAntenna =
      HotspotMakerModels[params.hotspotType || 'ExampleHotspotBLE'].antenna
    const ant =
      isUS && makerAntenna?.us ? makerAntenna.us : makerAntenna?.default

    if (!ant)
      return isUS ? Example.antennas.EXAMPLE_US : Example.antennas.EXAMPLE_US

    return ant
  }, [params.hotspotType])

  const [antenna, setAntenna] = useState<MakerAntenna>(defaultAntenna)
  const [gain, setGain] = useState<number>(defaultAntenna.gain)
  const [elevation, setElevation] = useState<number>(0)

  const navNext = useCallback(async () => {
    if (!antenna) return

    navigation.navigate('HotspotSetupConfirmLocationScreen', {
      ...params,
      gain,
      elevation,
    })
  }, [antenna, elevation, gain, navigation, params])

  return (
    <BackScreen onClose={handleClose}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior="padding"
      >
        <Box flex={1} justifyContent="center" paddingBottom="xxl">
          <Box>
            <Text
              variant="h1"
              marginBottom="s"
              marginTop="l"
              maxFontSizeMultiplier={1}
            >
              {t('antennas.onboarding.title')}
            </Text>
            <Text
              variant="subtitle2"
              numberOfLines={2}
              adjustsFontSizeToFit
              maxFontSizeMultiplier={1.3}
            >
              {t('antennas.onboarding.subtitle')}
            </Text>
          </Box>
          <HotspotConfigurationPicker
            selectedAntenna={antenna}
            onAntennaUpdated={setAntenna}
            onGainUpdated={setGain}
            onElevationUpdated={setElevation}
          />
        </Box>
      </KeyboardAvoidingView>
      <DebouncedButton
        title={t('generic.next')}
        mode="contained"
        variant="primary"
        onPress={navNext}
      />
    </BackScreen>
  )
}

const styles = StyleSheet.create({ keyboardAvoidingView: { flex: 1 } })

export default AntennaSetupScreen
