import React, { useCallback, useMemo } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useHotspotBle } from '@helium/react-native-sdk'
import { useAnalytics } from '@segment/analytics-react-native'
import BackScreen from '../../../components/BackScreen'
import HotspotSetupBluetoothError from './HotspotSetupBluetoothError'
import HotspotSetupBluetoothSuccess from './HotspotSetupBluetoothSuccess'
import { RootNavigationProp } from '../../../navigation/main/tabTypes'
import { HotspotEvents } from '../../../utils/analytics/events'

const HotspotSetupPickHotspotScreen = () => {
  const { track } = useAnalytics()

  const { scannedDevices } = useHotspotBle()
  const rootNav = useNavigation<RootNavigationProp>()
  const handleClose = useCallback(() => rootNav.navigate('MainTabs'), [rootNav])

  const hotspotsFound = useMemo(() => !!scannedDevices.length, [
    scannedDevices.length,
  ])

  // Segment track for bluetooth scan
  track(HotspotEvents.BLUETOOTH_SCAN_FINISHED, {
    scanned_devices_count: scannedDevices.length,
  })

  if (hotspotsFound) {
    return (
      <BackScreen
        backgroundColor="primaryBackground"
        padding="none"
        onClose={handleClose}
      >
        <HotspotSetupBluetoothSuccess />
      </BackScreen>
    )
  }

  return (
    <BackScreen backgroundColor="primaryBackground" onClose={handleClose}>
      <HotspotSetupBluetoothError />
    </BackScreen>
  )
}

export default HotspotSetupPickHotspotScreen
