import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Device } from 'react-native-ble-plx'
import { useHotspotBle } from '@helium/react-native-sdk'
import Box from '../../../components/Box'
import HotspotPairingList from '../../../components/HotspotPairingList'
import Text from '../../../components/Text'
import { HotspotSetupNavigationProp } from './hotspotSetupTypes'

const HotspotSetupBluetoothSuccess = () => {
  const { t } = useTranslation()
  const navigation = useNavigation<HotspotSetupNavigationProp>()
  const { scannedDevices } = useHotspotBle()

  const handleConnect = async (hotspot: Device) => {
    navigation.replace('HotspotSetupConnectingScreen', {
      hotspotId: hotspot.id,
    })
  }

  return (
    <Box flex={1}>
      <Box padding="lx" backgroundColor="primaryBackground">
        <Text
          variant="h1"
          numberOfLines={1}
          adjustsFontSizeToFit
          marginBottom="m"
        >
          {t('hotspot_setup.ble_select.hotspots_found', {
            count: scannedDevices?.length,
          })}
        </Text>
        <Text variant="subtitle2">
          {t('hotspot_setup.ble_select.subtitle')}
        </Text>
      </Box>
      <Box
        flex={1}
        paddingHorizontal="lx"
        backgroundColor="secondaryBackground"
      >
        <HotspotPairingList hotspots={scannedDevices} onPress={handleConnect} />
      </Box>
    </Box>
  )
}

export default HotspotSetupBluetoothSuccess
