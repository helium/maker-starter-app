import React from 'react'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { isString } from 'lodash'
import {
  HotspotErrorCode,
  WalletLink,
  Location,
} from '@helium/react-native-sdk'
import { ActivityIndicator, Linking } from 'react-native'

import Text from '../../../components/Text'
import Box from '../../../components/Box'
import { hotspotOnChain } from '../../../utils/appDataClient'
import useAlert from '../../../utils/useAlert'
import { getSecureItem } from '../../../utils/secureAccount'
import { useColors } from '../../../theme/themeHooks'
import useMount from '../../../utils/useMount'
import { SignedInStackNavigationProp } from '../../../navigation/navigationRootTypes'
import { GatewayOnboardingStackParamList } from '../../../navigation/gatewayOnboardingNavigatorTypes'

type Route = RouteProp<GatewayOnboardingStackParamList, 'TxnProgressScreen'>

const TxnProgressScreen = () => {
  const { t } = useTranslation()
  const { params } = useRoute<Route>()
  const navigation = useNavigation<SignedInStackNavigationProp>()
  const { showOKAlert } = useAlert()
  const { primaryText } = useColors()

  const handleError = async (error: unknown) => {
    let titleKey = 'generic.error'
    let messageKey = 'generice.somethingWentWrong'

    if (isString(error)) {
      if (error === HotspotErrorCode.WAIT) {
        messageKey = t('gatewayOnboarding.txnProgressScreen.waitErrorBody')
        titleKey = t('gatewayOnboarding.txnProgressScreen.waitErrorTitle')
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

    const { hotspotAddress, addGatewayTxn } = params

    if (!hotspotAddress) {
      if (addGatewayTxn) {
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
    if (!isOnChain) {
      updateParams.addGatewayTxn = addGatewayTxn
    }

    // construct and publish assert location
    if (params.coords) {
      const [lng, lat] = params.coords
      const onboardingRecord = params?.onboardingRecord

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
    <Box
      flex={1}
      backgroundColor="primaryBackground"
      paddingHorizontal="m"
      paddingBottom="m"
    >
      <Box flex={1} alignItems="center">
        <Text variant="subtitle1" marginBottom="l">
          {t('gatewayOnboarding.txnProgressScreen.title')}
        </Text>
        <Box flex={1} justifyContent="center">
          <ActivityIndicator color={primaryText} />
        </Box>
      </Box>
    </Box>
  )
}

export default TxnProgressScreen
