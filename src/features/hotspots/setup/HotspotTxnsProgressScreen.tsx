import React from 'react'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { isString } from 'lodash'
import {
  useHotspotBle,
  HotspotErrorCode,
  WalletLink,
  Location,
  useOnboarding,
} from '@helium/react-native-sdk'
import { ActivityIndicator, Linking } from 'react-native'
import Box from '../../../components/Box'
import Text from '../../../components/Text'
import { RootNavigationProp } from '../../../navigation/main/tabTypes'
import SafeAreaBox from '../../../components/SafeAreaBox'
import { hotspotOnChain } from '../../../utils/appDataClient'
import useAlert from '../../../utils/useAlert'
import { HotspotSetupStackParamList } from './hotspotSetupTypes'
import { getSecureItem } from '../../../utils/secureAccount'
import { useColors } from '../../../theme/themeHooks'
import { DebouncedButton } from '../../../components/Button'
import useMount from '../../../utils/useMount'

type Route = RouteProp<HotspotSetupStackParamList, 'HotspotTxnsProgressScreen'>

const HotspotTxnsProgressScreen = () => {
  const { t } = useTranslation()
  const { params } = useRoute<Route>()
  const navigation = useNavigation<RootNavigationProp>()
  const { showOKAlert } = useAlert()
  const { createGatewayTxn } = useHotspotBle()
  const { getOnboardingRecord } = useOnboarding()
  const { primaryText } = useColors()

  const handleError = async (error: unknown) => {
    // eslint-disable-next-line no-console
    console.error(error)
    let titleKey = 'generic.error'
    let messageKey = 'generice.something_went_wrong'

    if (isString(error)) {
      if (error === HotspotErrorCode.WAIT) {
        messageKey = t('hotspot_setup.add_hotspot.wait_error_body')
        titleKey = t('hotspot_setup.add_hotspot.wait_error_title')
      } else {
        messageKey = `Got error code ${error}`
      }
    }

    await showOKAlert({ titleKey, messageKey })
    navigation.navigate('MainTabs')
  }

  const submitOnboardingTxns = async () => {
    const token = await getSecureItem('walletLinkToken')
    if (!token) throw new Error('Token Not found')

    const parsed = WalletLink.parseWalletLinkToken(token)
    if (!parsed?.address) throw new Error('Invalid Token')

    const { address: ownerAddress } = parsed

    const { hotspotAddress, addGatewayTxn: qrAddGatewayTxn } = params

    if (!hotspotAddress) {
      if (qrAddGatewayTxn) {
        throw new Error('Hotspot not found')
      } else {
        throw new Error('Hotspot disconnected')
      }
    }

    const updateParams = {
      token,
    } as WalletLink.SignHotspotRequest

    // check if add gateway needed
    const isOnChain = await hotspotOnChain(hotspotAddress)
    const onboardingRecord = await getOnboardingRecord(hotspotAddress)
    if (!onboardingRecord) return
    if (!isOnChain) {
      // if so, construct and publish add gateway
      if (qrAddGatewayTxn) {
        // Gateway QR scanned
        updateParams.addGatewayTxn = qrAddGatewayTxn
      } else {
        // Gateway BLE scanned
        const addGatewayTxn = await createGatewayTxn({
          ownerAddress,
          payerAddress: onboardingRecord.maker.address,
        })
        updateParams.addGatewayTxn = addGatewayTxn
      }
    }

    // construct and publish assert location
    if (params.coords) {
      const [lng, lat] = params.coords

      const assertLocationTxn = await Location.createLocationTxn({
        gateway: hotspotAddress,
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
    }

    const url = WalletLink.createUpdateHotspotUrl(updateParams)
    if (!url) {
      // eslint-disable-next-line no-console
      console.error('Link could not be created')
      return
    }

    Linking.openURL(url)
  }

  useMount(() => {
    try {
      submitOnboardingTxns()
    } catch (e) {
      handleError(e)
    }
  })

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
        <Box flex={1} justifyContent="center">
          <ActivityIndicator color={primaryText} />
        </Box>
      </Box>
      <DebouncedButton
        onPress={() => navigation.navigate('MainTabs')}
        variant="primary"
        width="100%"
        mode="contained"
        title={t('generic.cancel')}
      />
    </SafeAreaBox>
  )
}

export default HotspotTxnsProgressScreen
