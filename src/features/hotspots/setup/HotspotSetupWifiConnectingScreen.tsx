import React, { useCallback } from 'react'
import { uniq } from 'lodash'
import { useAsync } from 'react-async-hook'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { BleError, useHotspotBle } from '@helium/react-native-sdk'
import { useAnalytics } from '@segment/analytics-react-native'
import useAlert from '../../../utils/useAlert'
import {
  HotspotSetupNavigationProp,
  HotspotSetupStackParamList,
} from './hotspotSetupTypes'
import Text from '../../../components/Text'
import Box from '../../../components/Box'
import SafeAreaBox from '../../../components/SafeAreaBox'
import { getHotspotDetails } from '../../../utils/appDataClient'
import { getAddress } from '../../../utils/secureAccount'
import { HotspotEvents } from '../../../utils/analytics/events'

type Route = RouteProp<
  HotspotSetupStackParamList,
  'HotspotSetupWifiConnectingScreen'
>

const HotspotSetupWifiConnectingScreen = () => {
  const { t } = useTranslation()
  const navigation = useNavigation<HotspotSetupNavigationProp>()

  const {
    params: { network, password, hotspotAddress, addGatewayTxn, hotspotType },
  } = useRoute<Route>()

  const { readWifiNetworks, setWifi, removeConfiguredWifi } = useHotspotBle()

  const { showOKAlert } = useAlert()

  const { track } = useAnalytics()

  const handleError = useCallback(
    async (err: unknown) => {
      let msg = ''

      if ((err as BleError).toString !== undefined) {
        msg = (err as BleError).toString()
      } else {
        msg = err as string
      }
      await showOKAlert({ titleKey: 'generic.error', messageKey: msg })
      navigation.goBack()
    },
    [navigation, showOKAlert],
  )

  const goToNextStep = useCallback(async () => {
    const address = await getAddress()
    const hotspot = await getHotspotDetails(hotspotAddress)
    if (hotspot && hotspot.owner === address) {
      navigation.replace('OwnedHotspotErrorScreen')
    } else if (hotspot && hotspot.owner !== address) {
      navigation.replace('NotHotspotOwnerErrorScreen')
    } else {
      navigation.replace('HotspotSetupLocationInfoScreen', {
        hotspotAddress,
        addGatewayTxn,
        hotspotType,
      })
    }
  }, [addGatewayTxn, hotspotAddress, hotspotType, navigation])

  const connectToWifi = useCallback(async () => {
    // Segment track for wifi connection
    track(HotspotEvents.WIFI_CONNECTION_STARTED, {
      network,
    })

    const response = await setWifi(network, password)
    if (response === 'not_found') {
      // Segment track for wifi connection
      track(HotspotEvents.WIFI_CONNECTION_FAILED, {
        network,
        message: 'Something went wrong.',
      })

      showOKAlert({
        titleKey: 'generic.error',
        messageKey: 'generic.something_went_wrong',
      })
      navigation.goBack()
    } else if (response === 'invalid') {
      // Segment track for wifi connection
      track(HotspotEvents.WIFI_CONNECTION_FAILED, {
        network,
        message: 'Invalid password.',
      })

      showOKAlert({
        titleKey: 'generic.error',
        messageKey: 'generic.invalid_password',
      })
      navigation.goBack()
    } else {
      // Segment track for wifi connection
      track(HotspotEvents.WIFI_CONNECTION_FINISHED, {
        network,
      })

      goToNextStep()
    }
  }, [goToNextStep, navigation, network, password, setWifi, showOKAlert, track])

  const forgetWifi = async () => {
    try {
      const connectedNetworks = uniq((await readWifiNetworks(true)) || [])
      if (connectedNetworks.length > 0) {
        await removeConfiguredWifi(connectedNetworks[0])
      }
    } catch (e) {
      handleError(e)
    }
  }

  useAsync(async () => {
    await forgetWifi()
    connectToWifi()
  }, [])

  return (
    <SafeAreaBox flex={1} backgroundColor="primaryBackground">
      <Box flex={1} justifyContent="center" paddingBottom="xxl">
        <Box marginTop="xl">
          <Text variant="body1" textAlign="center">
            {t('hotspot_setup.wifi_password.connecting').toUpperCase()}
          </Text>
        </Box>
      </Box>
    </SafeAreaBox>
  )
}

export default HotspotSetupWifiConnectingScreen
