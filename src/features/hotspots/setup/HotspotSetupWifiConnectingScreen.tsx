import React, { useCallback } from 'react'
import { uniq } from 'lodash'
import { useAsync } from 'react-async-hook'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { BleError, useHotspotBle } from '@helium/react-native-sdk'
import useAlert from '../../../utils/useAlert'
import {
  HotspotSetupNavigationProp,
  HotspotSetupStackParamList,
} from './hotspotSetupTypes'
import Text from '../../../components/Text'
import Box from '../../../components/Box'
import SafeAreaBox from '../../../components/SafeAreaBox'
import { getHotspotDetails } from '../../../utils/appDataClient'
import { getSecureItem } from '../../../utils/secureAccount'

type Route = RouteProp<
  HotspotSetupStackParamList,
  'HotspotSetupWifiConnectingScreen'
>

const HotspotSetupWifiConnectingScreen = () => {
  const { t } = useTranslation()
  const navigation = useNavigation<HotspotSetupNavigationProp>()

  const {
    params: {
      network,
      password,
      hotspotAddress,
      onboardingRecord,
      addGatewayTxn,
      hotspotType,
    },
  } = useRoute<Route>()

  const { readWifiNetworks, setWifi, removeConfiguredWifi } = useHotspotBle()

  const { showOKAlert } = useAlert()

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
    const address = await getSecureItem('address')
    const hotspot = await getHotspotDetails(hotspotAddress)
    if (hotspot && hotspot.owner === address) {
      navigation.replace('OwnedHotspotErrorScreen')
    } else if (hotspot && hotspot.owner !== address) {
      navigation.replace('NotHotspotOwnerErrorScreen')
    } else {
      navigation.replace('HotspotSetupLocationInfoScreen', {
        hotspotAddress,
        onboardingRecord,
        addGatewayTxn,
        hotspotType,
      })
    }
  }, [addGatewayTxn, hotspotAddress, hotspotType, navigation, onboardingRecord])

  const connectToWifi = useCallback(async () => {
    const response = await setWifi(network, password)
    if (response === 'not_found') {
      showOKAlert({
        titleKey: 'generic.error',
        messageKey: 'generic.something_went_wrong',
      })
      navigation.goBack()
    } else if (response === 'invalid') {
      showOKAlert({
        titleKey: 'generic.error',
        messageKey: 'generic.invalid_password',
      })
      navigation.goBack()
    } else {
      goToNextStep()
    }
  }, [goToNextStep, navigation, network, password, setWifi, showOKAlert])

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
