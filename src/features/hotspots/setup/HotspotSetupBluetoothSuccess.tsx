import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BleError, Device } from 'react-native-ble-plx'
import { useHotspotBle, useOnboarding } from '@helium/react-native-sdk'
import { uniq } from 'lodash'
import { useAnalytics } from '@segment/analytics-react-native'
import animalName from 'angry-purple-tiger'
import { useSelector } from 'react-redux'
import Box from '../../../components/Box'
import HotspotPairingList from '../../../components/HotspotPairingList'
import Text from '../../../components/Text'
import {
  HotspotSetupNavigationProp,
  HotspotSetupStackParamList,
} from './hotspotSetupTypes'
import useAlert from '../../../utils/useAlert'
import { HotspotEvents } from '../../../utils/analytics/events'
import { getHotspotDetails } from '../../../utils/appDataClient'
import { useAppDispatch } from '../../../store/store'
import hotspotOnboardingSlice from '../../../store/hotspots/hotspotOnboardingSlice'
import { getMakerName } from '../../../utils/stakingClient'
import { RootState } from '../../../store/rootReducer'

type Route = RouteProp<
  HotspotSetupStackParamList,
  'HotspotSetupPickHotspotScreen'
>
const HotspotSetupBluetoothSuccess = () => {
  const { t } = useTranslation()
  const [connectStatus, setConnectStatus] = useState<string | boolean>(false)
  const {
    params: { hotspotType, gatewayAction },
  } = useRoute<Route>()
  const navigation = useNavigation<HotspotSetupNavigationProp>()
  const {
    scannedDevices,
    connect,
    isConnected,
    checkFirmwareCurrent,
    readWifiNetworks,
    getOnboardingAddress,
  } = useHotspotBle()
  const { getMinFirmware, getOnboardingRecord } = useOnboarding()
  const { showOKAlert } = useAlert()
  const dispatch = useAppDispatch()
  const makers = useSelector((state: RootState) => state.heliumData.makers)

  const { track } = useAnalytics()

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

      // Segment track for bluetooth connection
      track(HotspotEvents.BLUETOOTH_CONNECTION_STARTED, {
        hotspot_id: hotspot.id,
      })

      setConnectStatus(hotspot.id)
      try {
        const connected = await isConnected()
        if (!connected) {
          await connect(hotspot)
        }
        setConnectStatus(true)

        // Segment track for bluetooth connection
        track(HotspotEvents.BLUETOOTH_CONNECTION_FINISHED, {
          hotspot_id: hotspot.id,
        })
      } catch (e) {
        setConnectStatus(false)

        // Segment track for bluetooth connection
        track(HotspotEvents.BLUETOOTH_CONNECTION_FAILED, {
          hotspot_id: hotspot.id,
        })

        handleError(e)
      }
    },
    [connect, connectStatus, handleError, isConnected, track],
  )

  useEffect(() => {
    const configureHotspot = async () => {
      if (connectStatus !== true) return

      try {
        // check firmware
        const minFirmware = await getMinFirmware()
        if (!minFirmware) return
        const firmwareDetails = await checkFirmwareCurrent(minFirmware)
        if (!firmwareDetails.current) {
          navigation.navigate('FirmwareUpdateNeededScreen', firmwareDetails)
          return
        }

        // scan for wifi networks
        const networks = uniq((await readWifiNetworks(false)) || [])
        const connectedNetworks = uniq((await readWifiNetworks(true)) || [])
        const hotspotAddress = await getOnboardingAddress()

        // Save the hotspot details for later use
        const hotspot = await getHotspotDetails(hotspotAddress)
        dispatch(
          hotspotOnboardingSlice.actions.setHotspotAddress(hotspotAddress),
        )
        dispatch(
          hotspotOnboardingSlice.actions.setHotspotName(
            animalName(hotspotAddress),
          ),
        )
        dispatch(
          hotspotOnboardingSlice.actions.setOwnerAddress(hotspot?.owner || ''),
        )
        dispatch(
          hotspotOnboardingSlice.actions.setMakerName(
            getMakerName(hotspot?.payer, makers),
          ),
        )

        const onboardingRecord = await getOnboardingRecord(hotspotAddress)
        if (!onboardingRecord) return

        // navigate to next screen
        if (gatewayAction === 'addGateway') {
          navigation.replace('HotspotSetupPickWifiScreen', {
            networks,
            connectedNetworks,
            hotspotAddress,
            hotspotType,
          })
        } else {
          navigation.replace('HotspotSetupPickLocationScreen', {
            hotspotAddress,
            hotspotType,
          })
        }
      } catch (e) {
        handleError(e)
      }
    }
    configureHotspot()
  }, [
    checkFirmwareCurrent,
    connectStatus,
    dispatch,
    gatewayAction,
    getMinFirmware,
    getOnboardingAddress,
    getOnboardingRecord,
    handleError,
    hotspotType,
    makers,
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
