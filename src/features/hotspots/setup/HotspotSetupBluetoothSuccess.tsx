/* eslint-disable no-console */
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BleError, Device } from 'react-native-ble-plx'
import {
  HotspotErrorCode,
  useHotspotBle,
  useOnboarding,
} from '@helium/react-native-sdk'
import { isString, uniq } from 'lodash'
import Config from 'react-native-config'
import Box from '../../../components/Box'
import HotspotPairingList from '../../../components/HotspotPairingList'
import Text from '../../../components/Text'
import {
  HotspotSetupNavigationProp,
  HotspotSetupStackParamList,
} from './hotspotSetupTypes'
import useAlert from '../../../utils/useAlert'
import { getAddress } from '../../../utils/secureAccount'

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
    createGatewayTxn,
    connect,
    isConnected,
    checkFirmwareCurrent,
    readWifiNetworks,
    getOnboardingAddress,
  } = useHotspotBle()
  const { getMinFirmware, getOnboardingRecord } = useOnboarding()
  const { showOKAlert } = useAlert()

  const handleError = useCallback(
    async (error: unknown) => {
      // eslint-disable-next-line no-console
      console.error(error)
      let titleKey = 'generic.error'
      let messageKey = 'generic.something_went_wrong'

      if (isString(error)) {
        if (error === HotspotErrorCode.WAIT) {
          messageKey = t('hotspot_setup.add_hotspot.wait_error_body')
          titleKey = t('hotspot_setup.add_hotspot.wait_error_title')
        } else {
          messageKey = `Got error code ${error}`
        }
      } else if ((error as BleError).toString !== undefined) {
        messageKey = (error as BleError).toString()
      }

      await showOKAlert({
        titleKey,
        messageKey,
      })
      // TODO: Handle Error
    },
    [showOKAlert, t],
  )

  const handleConnect = useCallback(
    async (hotspot: Device) => {
      if (connectStatus === 'connecting') return

      setConnectStatus(hotspot.id)
      try {
        const connected = await isConnected()
        if (!connected) {
          await connect(hotspot)
        }
        setConnectStatus(true)
      } catch (e) {
        setConnectStatus(false)
        handleError(e)
      }
    },
    [connect, connectStatus, handleError, isConnected],
  )

  useEffect(() => {
    const configureHotspot = async () => {
      if (connectStatus !== true) return

      if (gatewayAction === 'diagnostics') {
        navigation.navigate('HotspotSetupDiagnostics')
        return
      }

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
        const onboardingRecord = await getOnboardingRecord(hotspotAddress)
        if (!onboardingRecord) {
          console.log('onboarding record not found')
        }
        const payerAddress = onboardingRecord?.maker.address || Config.MAKER_ID

        if (!payerAddress) {
          console.log('Payer address not found')
          return
        }

        // navigate to next screen
        if (gatewayAction === 'addGateway' || gatewayAction === 'wifi') {
          const ownerAddress = await getAddress()
          const addGatewayTxn = await createGatewayTxn({
            ownerAddress,
            payerAddress,
          })
          navigation.replace('HotspotSetupPickWifiScreen', {
            networks,
            connectedNetworks,
            hotspotAddress,
            hotspotType,
            addGatewayTxn,
            gatewayAction,
          })
        } else {
          navigation.replace('HotspotSetupPickLocationScreen', {
            hotspotAddress,
            hotspotType,
            addGatewayTxn: '',
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
    createGatewayTxn,
    gatewayAction,
    getMinFirmware,
    getOnboardingAddress,
    getOnboardingRecord,
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
