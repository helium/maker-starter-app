import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BleError, Device } from 'react-native-ble-plx'
import { Onboarding, useHotspotBle } from '@helium/react-native-sdk'
import { uniq } from 'lodash'
import Box from '../../../components/Box'
import HotspotPairingList from '../../../components/HotspotPairingList'
import Text from '../../../components/Text'
import {
  HotspotSetupNavigationProp,
  HotspotSetupStackParamList,
} from './hotspotSetupTypes'
import useAlert from '../../../utils/useAlert'

type Route = RouteProp<
  HotspotSetupStackParamList,
  'HotspotSetupPickHotspotScreen'
>
const HotspotSetupBluetoothSuccess = () => {
  const { t } = useTranslation()
  const [connectStatus, setConnectStatus] = useState<string | boolean>(false)
  const {
    params: { hotspotType },
  } = useRoute<Route>()
  const navigation = useNavigation<HotspotSetupNavigationProp>()
  const {
    scannedDevices,
    connect,
    checkFirmwareCurrent,
    readWifiNetworks,
    getOnboardingAddress,
  } = useHotspotBle()
  const { showOKAlert } = useAlert()

  const handleError = useCallback(
    async (e: unknown) => {
      const titleKey = 'generic.error'
      if ((e as BleError).toString !== undefined) {
        await showOKAlert({
          titleKey,
          messageKey: (e as BleError).toString(),
        })
      }
    },
    [showOKAlert],
  )

  const handleConnect = useCallback(
    async (hotspot: Device) => {
      if (connectStatus === 'connecting') return

      setConnectStatus(hotspot.id)
      try {
        await connect(hotspot)
        setConnectStatus(true)
      } catch (e) {
        setConnectStatus(false)
        handleError(e)
      }
    },
    [connect, connectStatus, handleError],
  )

  useEffect(() => {
    const configureHotspot = async () => {
      if (connectStatus !== true) return

      try {
        // check firmware
        const firmwareDetails = await checkFirmwareCurrent()
        if (!firmwareDetails.current) {
          navigation.navigate('FirmwareUpdateNeededScreen', firmwareDetails)
          return
        }

        // scan for wifi networks
        const networks = uniq((await readWifiNetworks(false)) || [])
        const connectedNetworks = uniq((await readWifiNetworks(true)) || [])
        const hotspotAddress = await getOnboardingAddress()
        const onboardingRecord = await Onboarding.getOnboardingRecord(
          hotspotAddress,
        )

        // navigate to next screen
        navigation.replace('HotspotSetupPickWifiScreen', {
          networks,
          connectedNetworks,
          hotspotAddress,
          onboardingRecord,
          hotspotType,
        })
      } catch (e) {
        handleError(e)
      }
    }
    configureHotspot()
  }, [
    checkFirmwareCurrent,
    connectStatus,
    getOnboardingAddress,
    handleError,
    hotspotType,
    navigation,
    readWifiNetworks,
  ])

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
        <HotspotPairingList
          hotspots={scannedDevices}
          onPress={handleConnect}
          connect={connectStatus}
        />
      </Box>
    </Box>
  )
}

export default HotspotSetupBluetoothSuccess
