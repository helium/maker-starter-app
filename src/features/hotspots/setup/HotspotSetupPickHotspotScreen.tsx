import React, { useCallback, useMemo } from 'react'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { useHotspotBle } from '@helium/react-native-sdk'
import BackScreen from '../../../components/BackScreen'
import HotspotSetupBluetoothError from './HotspotSetupBluetoothError'
import HotspotSetupBluetoothSuccess from './HotspotSetupBluetoothSuccess'
import { RootNavigationProp } from '../../../navigation/main/tabTypes'
import { HotspotSetupStackParamList } from './hotspotSetupTypes'

type Route = RouteProp<
  HotspotSetupStackParamList,
  'HotspotSetupPickHotspotScreen'
>
const HotspotSetupPickHotspotScreen = () => {
  const {
    params: { gatewayAction },
  } = useRoute<Route>()
  const { scannedDevices } = useHotspotBle()
  const rootNav = useNavigation<RootNavigationProp>()
  const handleClose = useCallback(() => {
    if (gatewayAction === 'diagnostics_wallet_not_linked') {
      rootNav.popToTop()
    } else {
      rootNav.navigate('MainTabs')
    }
  }, [gatewayAction, rootNav])

  const hotspotsFound = useMemo(
    () => !!scannedDevices.length,
    [scannedDevices.length],
  )

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
