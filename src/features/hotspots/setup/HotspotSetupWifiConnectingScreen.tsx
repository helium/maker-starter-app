import React, { useCallback } from 'react'
import { uniq } from 'lodash'
import { useAsync } from 'react-async-hook'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { useAnalytics } from '@segment/analytics-react-native'
import {
  Account,
  BleError,
  HotspotMeta,
  useHotspotBle,
  useOnboarding,
  useSolana,
} from '@helium/react-native-sdk'
import useAlert from '../../../utils/useAlert'
import {
  HotspotSetupNavigationProp,
  HotspotSetupStackParamList,
} from './hotspotSetupTypes'
import Text from '../../../components/Text'
import Box from '../../../components/Box'
import SafeAreaBox from '../../../components/SafeAreaBox'
import { getAddress } from '../../../utils/secureAccount'
import {
  getEvent,
  Scope,
  SubScope,
  Action,
} from '../../../utils/analytics/utils'
import { getHotspotTypes } from '../root/hotspotTypes'

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
  const { getOnboardingRecord } = useOnboarding()
  const { getHotspotDetails } = useSolana()

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
    if (!address) return

    const onboardingRecord = await getOnboardingRecord(hotspotAddress)

    /*
         TODO: Determine which network types this hotspot supports
         Could possibly use the maker address
      */
    const hotspotTypes = getHotspotTypes({
      hotspotMakerAddress: onboardingRecord?.maker.address || '',
    })
    let hotspot: HotspotMeta | undefined
    if (hotspotTypes.length) {
      hotspot = await getHotspotDetails({
        address: hotspotAddress,
        type: hotspotTypes[0],
      })
    }

    if (
      hotspot &&
      (hotspot.owner === address ||
        hotspot.owner === Account.heliumAddressToSolAddress(address))
    ) {
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
  }, [
    addGatewayTxn,
    getHotspotDetails,
    getOnboardingRecord,
    hotspotAddress,
    hotspotType,
    navigation,
  ])

  const connectToWifi = useCallback(async () => {
    // Segment track for wifi connection
    track(
      getEvent({
        scope: Scope.HOTSPOT,
        sub_scope: SubScope.WIFI_CONNECTION,
        action: Action.STARTED,
      }),
    )

    const response = await setWifi(network, password)
    if (response === 'not_found') {
      // Segment track for wifi connection
      track(
        getEvent({
          scope: Scope.HOTSPOT,
          sub_scope: SubScope.WIFI_CONNECTION,
          action: Action.FAILED,
        }),
        {
          message: 'Something went wrong.',
        },
      )

      showOKAlert({
        titleKey: 'generic.error',
        messageKey: 'generic.something_went_wrong',
      })
      navigation.goBack()
    } else if (response === 'invalid') {
      // Segment track for wifi connection
      track(
        getEvent({
          scope: Scope.HOTSPOT,
          sub_scope: SubScope.WIFI_CONNECTION,
          action: Action.FAILED,
        }),
        {
          message: 'Invalid password.',
        },
      )

      showOKAlert({
        titleKey: 'generic.error',
        messageKey: 'generic.invalid_password',
      })
      navigation.goBack()
    } else {
      // Segment track for wifi connection
      track(
        getEvent({
          scope: Scope.HOTSPOT,
          sub_scope: SubScope.WIFI_CONNECTION,
          action: Action.FINISHED,
        }),
      )

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
