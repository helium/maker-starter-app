import React, { useEffect, useState } from 'react'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { isString } from 'lodash'
import {
  useHotspotBle,
  HotspotErrorCode,
  WalletLink,
  Location,
} from '@helium/react-native-sdk'
import { getApplicationName, getBundleId } from 'react-native-device-info'
import { Linking, Platform } from 'react-native'
import Box from '../../../components/Box'
import { DebouncedButton } from '../../../components/Button'
import Text from '../../../components/Text'
import { RootNavigationProp } from '../../../navigation/main/tabTypes'
import SafeAreaBox from '../../../components/SafeAreaBox'
import { getHotspotDetails } from '../../../utils/appDataClient'
import useAlert from '../../../utils/useAlert'
import { HotspotSetupStackParamList } from './hotspotSetupTypes'
import { getSecureItem } from '../../../utils/secureAccount'
import { APP_LINK_PROTOCOL } from '../../../providers/AppLinkProvider'

type Route = RouteProp<HotspotSetupStackParamList, 'HotspotTxnsProgressScreen'>

const HotspotTxnsProgressScreen = () => {
  const { t } = useTranslation()
  const { params } = useRoute<Route>()
  const navigation = useNavigation<RootNavigationProp>()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [finished, setFinished] = useState(false)
  const { showOKAlert } = useAlert()
  const { createGatewayTxn } = useHotspotBle()

  const handleError = async (
    error: unknown,
    source: 'assert_location' | 'add_gateway',
  ) => {
    console.error(error)
    let titleKey = 'generic.error'
    let messageKey =
      source === 'assert_location'
        ? 'hotspot_setup.add_hotspot.assert_loc_error_body'
        : 'hotspot_setup.add_hotspot.add_hotspot_error_body'

    if (isString(error)) {
      if (error === HotspotErrorCode.WAIT) {
        messageKey = t('hotspot_setup.add_hotspot.wait_error_body')
        titleKey = t('hotspot_setup.add_hotspot.wait_error_title')
      } else {
        messageKey = `Got error code ${error} from ${source}`
      }
    }

    await showOKAlert({ titleKey, messageKey })
    navigation.navigate('MainTabs')
  }

  const hotspotOnChain = async (address: string): Promise<boolean> => {
    try {
      await getHotspotDetails(address)
      return true
    } catch (error) {
      return false
    }
  }

  const submitOnboardingTxns = async () => {
    const token = await getSecureItem('walletLinkToken')
    if (!token) return
    const parsed = WalletLink.parseWalletLinkToken(token)
    if (!parsed?.address) return
    const { address: ownerAddress, signingAppId } = parsed

    const qrAddGatewayTxn = params?.addGatewayTxn

    if (!params.hotspotAddress && !qrAddGatewayTxn) {
      showOKAlert({
        titleKey: 'hotspot_setup.onboarding_error.title',
        messageKey: 'hotspot_setup.onboarding_error.disconnected',
      })
      return
    }

    if (qrAddGatewayTxn && !params?.hotspotAddress) {
      showOKAlert({
        titleKey: 'hotspot_setup.onboarding_error.title',
        messageKey: 'hotspot_setup.onboarding_error.subtitle',
      })
      return
    }

    const address = params?.hotspotAddress

    const requestApp = WalletLink.supportedApps.find(
      ({ androidPackage, iosBundleId }) => {
        const id = Platform.OS === 'android' ? androidPackage : iosBundleId
        return id === signingAppId
      },
    )

    if (!requestApp) return
    const updateParams = {
      gateway: address,
      universalLink: requestApp.universalLink,
      callbackUrl: APP_LINK_PROTOCOL,
      requestAppId: getBundleId(),
      requestAppName: getApplicationName(),
      token,
    } as WalletLink.SignHotspotRequest

    // check if add gateway needed
    const isOnChain = await hotspotOnChain(address)
    if (!isOnChain) {
      // if so, construct and publish add gateway
      if (qrAddGatewayTxn) {
        // Gateway Txn scanned from QR
        if (!address) {
          showOKAlert({
            titleKey: 'hotspot_setup.onboarding_error.title',
            messageKey: 'hotspot_setup.onboarding_error.disconnected',
          })
          return
        }
        updateParams.addGatewayTxn = qrAddGatewayTxn
      }
    } else {
      // Gateway BLE scanned
      if (!ownerAddress) {
        throw new Error('User is not linked to wallet')
      }
      try {
        const addGatewayTxn = await createGatewayTxn(ownerAddress)
        updateParams.addGatewayTxn = addGatewayTxn
      } catch (error) {
        await handleError(error, 'add_gateway')
        return
      }
    }

    // construct and publish assert location
    if (params.coords) {
      const [lng, lat] = params.coords
      const onboardingRecord = params?.onboardingRecord
      updateParams.makerName = onboardingRecord.maker.name

      try {
        const assertLocationTxn = await Location.createLocationTxn({
          gateway: address,
          lat,
          lng,
          decimalGain: params.gain,
          elevation: params.elevation,
          dataOnly: false,
          owner: ownerAddress,
          // currentLocation: '', // If reasserting location, put previous location here
          makerAddress: onboardingRecord.maker.address,
          locationNonceLimit: onboardingRecord.maker.locationNonceLimit || 0,
        })
        updateParams.assertLocationTxn = assertLocationTxn.toString()
      } catch (error) {
        handleError(error, 'assert_location')
      }
    } else {
      // setFinished(true)
    }

    const url = WalletLink.createUpdateHotspotUrl(updateParams)
    if (!Linking.canOpenURL(url)) return

    Linking.openURL(url)
  }

  useEffect(() => {
    submitOnboardingTxns()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <SafeAreaBox
      flex={1}
      backgroundColor="primaryBackground"
      padding="lx"
      paddingTop="xxl"
    >
      <Box flex={1} alignItems="center" paddingTop="xxl">
        <Text variant="subtitle1" marginBottom="l">
          {t('hotspot_setup.progress.title')}
        </Text>
        <Box paddingHorizontal="l">
          {finished && (
            <Text variant="body1" textAlign="center" marginBottom="l">
              {t('hotspot_setup.progress.subtitle')}
            </Text>
          )}
        </Box>
      </Box>
      <DebouncedButton
        onPress={() => navigation.navigate('MainTabs')}
        variant="primary"
        width="100%"
        mode="contained"
        title={t('hotspot_setup.progress.next')}
        disabled={!finished}
      />
    </SafeAreaBox>
  )
}

export default HotspotTxnsProgressScreen
