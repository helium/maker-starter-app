import React, { useEffect, useState } from 'react'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { isString } from 'lodash'
import {
  AddGateway,
  Onboarding,
  useHotspotBle,
  HotspotErrorCode,
} from '@helium/react-native-sdk'
import Box from '../../../components/Box'
import { DebouncedButton } from '../../../components/Button'
import Text from '../../../components/Text'
import { RootNavigationProp } from '../../../navigation/main/tabTypes'
import SafeAreaBox from '../../../components/SafeAreaBox'
import { getHotspotDetails, submitTxn } from '../../../utils/appDataClient'
import useAlert from '../../../utils/useAlert'
import { assertLocationTxn } from '../../../utils/assertLocationUtils'
import { HotspotSetupStackParamList } from './hotspotSetupTypes'
import {
  getAddress,
  getKeypair,
  getSodiumKeypair,
} from '../../../utils/secureAccount'

type Route = RouteProp<HotspotSetupStackParamList, 'HotspotTxnsProgressScreen'>

const HotspotTxnsProgressScreen = () => {
  const { t } = useTranslation()
  const { params } = useRoute<Route>()
  const navigation = useNavigation<RootNavigationProp>()
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

    // check if add gateway needed
    const isOnChain = await hotspotOnChain(address)
    if (!isOnChain) {
      // if so, construct and publish add gateway

      if (qrAddGatewayTxn) {
        if (!address) {
          showOKAlert({
            titleKey: 'hotspot_setup.onboarding_error.title',
            messageKey: 'hotspot_setup.onboarding_error.disconnected',
          })
          return
        }

        // Gateway Txn scanned from QR
        try {
          const txn = AddGateway.txnFromString(qrAddGatewayTxn)

          const keypair = await getKeypair()

          const txnOwnerSigned = await txn.sign({
            owner: keypair,
          })

          const stakingServerSignedTxnStr = await Onboarding.getOnboardingSignedTransaction(
            address,
            txnOwnerSigned.toString(),
          )

          const stakingServerSignedTxn = AddGateway.txnFromString(
            stakingServerSignedTxnStr,
          )

          await submitTxn(stakingServerSignedTxn.toString())
        } catch (error) {
          await handleError(error, 'add_gateway')
          return
        }
      } else {
        try {
          const ownerAddress = await getAddress()
          const ownerKeypairRaw = await getSodiumKeypair()

          if (!ownerAddress?.b58 || !ownerKeypairRaw) {
            await handleError(false, 'add_gateway')
            return
          }

          const addGatewayResponse = await createGatewayTxn(
            ownerAddress?.b58,
            ownerKeypairRaw,
          )
          await submitTxn(addGatewayResponse)
        } catch (error) {
          await handleError(error, 'add_gateway')
          return
        }
      }
    }

    // construct and publish assert location
    if (params.coords) {
      const [lng, lat] = params.coords
      try {
        const onboardingRecord = params?.onboardingRecord
        const assertLocTxnResponse = await assertLocationTxn({
          gateway: address,
          lat,
          lng,
          decimalGain: params.gain,
          elevation: params.elevation,
          onboardingRecord,
          dataOnly: false,
        })
        if (assertLocTxnResponse) {
          await submitTxn(assertLocTxnResponse)
          setFinished(true)
          return
        }
        handleError(false, 'assert_location')
      } catch (error) {
        handleError(error, 'assert_location')
      }
    } else {
      setFinished(true)
    }
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
