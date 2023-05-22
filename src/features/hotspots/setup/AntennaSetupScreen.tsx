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
import nebra from '../../../makers/nebra'
import { RootNavigationProp } from '../../../navigation/main/tabTypes'
import { isCN, isEU, isUS } from '../../../utils/countries'

type Route = RouteProp<HotspotSetupStackParamList, 'AntennaSetupScreen'>

const AntennaSetupScreen = () => {
  const { t } = useTranslation()
  const navigation = useNavigation<HotspotSetupNavigationProp>()
  const rootNav = useNavigation<RootNavigationProp>()
  const { params } = useRoute<Route>()

  const handleClose = useCallback(() => rootNav.navigate('MainTabs'), [rootNav])

  const defaultAntenna = useMemo(() => {
    const country = getCountry()

    if (isUS(country)) return nebra.antennas.NEBRA_STOCK_US
    if (isEU(country)) return nebra.antennas.NEBRA_STOCK_EU
    if (isCN(country)) return nebra.antennas.NEBRA_STOCK_CN

    return nebra.antennas.NEBRA_STOCK_US
  }, [])

  const [antenna, setAntenna] = useState<MakerAntenna>(defaultAntenna)
  const [gain, setGain] = useState<number>(defaultAntenna.gain)
  const [elevation, setElevation] = useState<number>(0)

  const navNext = useCallback(async () => {
    if (!antenna) return

    const newParams = {
      ...params,
      gain,
      elevation,
    }
    console.log('all parameters: ', newParams)

    navigation.navigate('HotspotSetupConfirmLocationScreen', newParams)
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
