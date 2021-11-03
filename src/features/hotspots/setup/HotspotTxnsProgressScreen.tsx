import React, { useEffect, useState } from 'react'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { isString } from 'lodash'
import {
  useHotspotBle,
  HotspotErrorCode,
  WalletLink,
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
    error: false | Error | string,
    source: 'assert_location' | 'add_gateway',
  ) => {
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

    let updateParams = {
      gateway: address,
    } as WalletLink.SignHotspot

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
        updateParams.qrAddGatewayTxn = qrAddGatewayTxn

        // try {
        //   const txn = AddGateway.txnFromString(qrAddGatewayTxn)

        //   const keypair = await getKeypair()

        //   const txnOwnerSigned = await txn.sign({
        //     owner: keypair,
        //   })

        //   const stakingServerSignedTxnStr = await Onboarding.getOnboardingSignedTransaction(
        //     address,
        //     txnOwnerSigned.toString(),
        //   )

        //   const stakingServerSignedTxn = AddGateway.txnFromString(
        //     stakingServerSignedTxnStr,
        //   )

        //   await submitTxn(stakingServerSignedTxn.toString())
        // } catch (error) {
        //   await handleError(error, 'add_gateway')
        //   return
      }
    } else {
      // Gateway BLE scanned
      // try {
      //   const ownerAddress = await getAddress()
      //   const ownerKeypairRaw = await getSodiumKeypair()
      //   if (!ownerAddress?.b58 || !ownerKeypairRaw) {
      //     await handleError(false, 'add_gateway')
      //     return
      //   }

      if (!ownerAddress) {
        throw new Error('User is not linked to wallet')
      }
      try {
        const addGatewayResponse = await createGatewayTxn(ownerAddress)
        updateParams.addGatewayResponse = addGatewayResponse

        //   await submitTxn(addGatewayResponse)
      } catch (error) {
        await handleError(error, 'add_gateway')
        return
      }
      // }
    }

    // construct and publish assert location
    if (params.coords) {
      const [lng, lat] = params.coords
      // try {
      const onboardingRecord = params?.onboardingRecord
      //       lat,
      // lng,
      // decimalGain,
      // elevation,
      // dataOnly,
      // ownerKeypairRaw,
      // currentLocation,
      // makerAddress: onboardingRecord?.maker?.address,
      // locationNonceLimit: onboardingRecord?.maker?.locationNonceLimit || 0
      updateParams = {
        ...updateParams,
        lat,
        lng,
        decimalGain: params.gain,
        elevation: params.elevation,
        dataOnly: false,
        isUpdatingLocation: true,
        makerAddress: onboardingRecord.maker.address,
        makerName: onboardingRecord.maker.name,
        locationNonceLimit: onboardingRecord.maker.locationNonceLimit || 0,
      }
      //   const assertLocTxnResponse = await assertLocationTxn({
      //     gateway: address,
      //     lat,
      //     lng,
      //     decimalGain: params.gain,
      //     elevation: params.elevation,
      //     onboardingRecord,
      //     dataOnly: false,
      //   })
      //   if (assertLocTxnResponse) {
      //     await submitTxn(assertLocTxnResponse)
      //     setFinished(true)
      //     return
      //   }
      //   handleError(false, 'assert_location')
      // } catch (error) {
      //   handleError(error, 'assert_location')
      // }
    } else {
      // setFinished(true)
    }

    const requestApp = WalletLink.supportedApps.find(
      ({ androidPackage, iosBundleId }) => {
        const id = Platform.OS === 'android' ? androidPackage : iosBundleId
        return id === signingAppId
      },
    )
    if (!requestApp) return

    const url = WalletLink.createUpdateHotspotUrl({
      ...updateParams,
      universalLink: requestApp.universalLink,
      callbackUrl: APP_LINK_PROTOCOL,
      requestAppId: getBundleId(),
      requestAppName: getApplicationName(),
      token,
    })
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
        onPress={submitOnboardingTxns}
        // onPress={() => navigation.navigate('MainTabs')}
        variant="primary"
        width="100%"
        mode="contained"
        title={t('hotspot_setup.progress.next')}
        // disabled={!finished}
      />
    </SafeAreaBox>
  )
}

export default HotspotTxnsProgressScreen
