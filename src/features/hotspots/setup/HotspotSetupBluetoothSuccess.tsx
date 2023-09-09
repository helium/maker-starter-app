import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BleError, Device } from 'react-native-ble-plx'
import { useAnalytics } from '@segment/analytics-react-native'
import { useSelector } from 'react-redux'
import {
  HotspotErrorCode,
  useHotspotBle,
  useOnboarding,
} from '@helium/react-native-sdk'
import { isString, uniq } from 'lodash'
import { parseWalletLinkToken } from '@helium/wallet-link'
import Config from 'react-native-config'
import { compare as versionCompare } from 'compare-versions'
import Box from '../../../components/Box'
import HotspotPairingList from '../../../components/HotspotPairingList'
import Text from '../../../components/Text'
import {
  HotspotSetupNavigationProp,
  HotspotSetupStackParamList,
} from './hotspotSetupTypes'
import useAlert from '../../../utils/useAlert'
import {
  getEvent,
  Scope,
  SubScope,
  Action,
} from '../../../utils/analytics/utils'
import { RootState } from '../../../store/rootReducer'
import { getSecureItem } from '../../../utils/secureAccount'
import useSolanaCache from '../../../utils/solanaCache'

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
  const { getMinFirmware } = useOnboarding()
  const { getCachedOnboardingRecord: getOnboardingRecord } = useSolanaCache()

  const { showOKAlert } = useAlert()
  const makers = useSelector((state: RootState) => state.heliumData.makers)

  const { track } = useAnalytics()

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

      // Segment track for bluetooth connection
      track(
        getEvent({
          scope: Scope.HOTSPOT,
          sub_scope: SubScope.BLUETOOTH_CONNECTION,
          action: Action.STARTED,
        }),
        {
          hotspot_id: hotspot.id,
        },
      )

      setConnectStatus(hotspot.id)
      try {
        const connected = await isConnected()
        if (!connected) {
          await connect(hotspot)
        }
        setConnectStatus(true)

        // Segment track for bluetooth connection
        track(
          getEvent({
            scope: Scope.HOTSPOT,
            sub_scope: SubScope.BLUETOOTH_CONNECTION,
            action: Action.FINISHED,
          }),
          {
            hotspot_id: hotspot.id,
          },
        )
      } catch (e) {
        setConnectStatus(false)

        // Segment track for bluetooth connection
        track(
          getEvent({
            scope: Scope.HOTSPOT,
            sub_scope: SubScope.BLUETOOTH_CONNECTION,
            action: Action.FAILED,
          }),
          {
            hotspot_id: hotspot.id,
          },
        )

        handleError(e)
      }
    },
    [connect, connectStatus, handleError, isConnected, track],
  )

  useEffect(() => {
    const configureHotspot = async () => {
      if (connectStatus !== true) return

      try {
        // check firmware, comes as gateway-v1.0.0 etc from gateway
        const minFirmware = await getMinFirmware()
        if (!minFirmware) return
        const firmwareDetails = await checkFirmwareCurrent(minFirmware)
        // also check v1.0.0 as min version for solana transition
        const lightCurrent = versionCompare(
          firmwareDetails.deviceFirmwareVersion,
          'v0.9.9',
          '>=',
        )

        // check for third party mess, some devices only have latest or gateway-latest
        const othersCurrent =
          firmwareDetails.deviceFirmwareVersion.includes('latest')

        const isCurrent =
          firmwareDetails.current || lightCurrent || othersCurrent
        if (!isCurrent) {
          // console.log(isCurrent)
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
        if (gatewayAction === 'addGateway') {
          const token = await getSecureItem('walletLinkToken')
          if (!token) throw new Error('Token Not found')
          const parsed = parseWalletLinkToken(token)
          if (!parsed?.address) throw new Error('Invalid Token')

          const { address: ownerAddress } = parsed
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
          })
        } else if (gatewayAction === 'setupWifi') {
          // TODO:: we are currently differentiating wifi setup
          // and addgateway action based on wether addGateway is empty
          // or not. We should have a separate parameter for it.
          navigation.replace('HotspotSetupPickWifiScreen', {
            networks,
            connectedNetworks,
            hotspotAddress,
            hotspotType,
            addGatewayTxn: '',
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
