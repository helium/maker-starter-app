import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { uniq } from 'lodash'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useHotspotBle } from '@helium/react-native-sdk'
import Box from '../../../components/Box'
import SafeAreaBox from '../../../components/SafeAreaBox'
import Text from '../../../components/Text'
import useAlert from '../../../utils/useAlert'
import {
  HotspotSetupNavigationProp,
  HotspotSetupStackParamList,
} from './hotspotSetupTypes'

type Route = RouteProp<
  HotspotSetupStackParamList,
  'HotspotSetupConnectingScreen'
>
const HotspotSetupConnectingScreen = () => {
  const { t } = useTranslation()
  const navigation = useNavigation<HotspotSetupNavigationProp>()
  const {
    params: { hotspotId },
  } = useRoute<Route>()

  const { showOKAlert } = useAlert()

  const {
    scannedDevices,
    connect,
    readWifiNetworks,
    checkFirmwareCurrent,
  } = useHotspotBle()

  const hotspot = scannedDevices.find((d) => d.id === hotspotId)

  useEffect(() => {
    return navigation.addListener('focus', async () => {
      try {
        if (!hotspot) {
          navigation.navigate('OnboardingErrorScreen', {
            connectStatus: 'no_device_found',
          })
          return
        }

        // connect to hotspot
        await connect(hotspot)

        // check firmware
        const hasCurrentFirmware = await checkFirmwareCurrent()
        if (!hasCurrentFirmware) {
          navigation.navigate('FirmwareUpdateNeededScreen')
          return
        }

        // scan for wifi networks
        const networks = uniq((await readWifiNetworks(false)) || [])
        const connectedNetworks = uniq((await readWifiNetworks(true)) || [])

        // navigate to next screen
        navigation.replace('HotspotSetupPickWifiScreen', {
          networks,
          connectedNetworks,
        })
      } catch (e) {
        const titleKey = 'generic.error'
        await showOKAlert({ titleKey, messageKey: e.toString() })
        navigation.goBack()
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <SafeAreaBox flex={1} backgroundColor="primaryBackground">
      <Box flex={0.8} justifyContent="center">
        <Text
          marginTop="xl"
          variant="body2"
          numberOfLines={1}
          adjustsFontSizeToFit
          textAlign="center"
        >
          {t('hotspot_setup.ble_scan.connecting', {
            hotspotName: hotspot?.localName,
          }).toUpperCase()}
        </Text>
      </Box>
    </SafeAreaBox>
  )
}

export default HotspotSetupConnectingScreen
