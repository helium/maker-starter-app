import React from 'react'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { isString } from 'lodash'
import {
  HotspotErrorCode,
  WalletLink,
  Location,
} from '@helium/react-native-sdk'
import { Linking } from 'react-native'
import Toast from 'react-native-simple-toast'

import { ActivityIndicatorCentered } from '../../../components/ActivityIndicator'
import Text from '../../../components/Text'
import Box from '../../../components/Box'
import { hotspotOnChain } from '../../../utils/appDataClient'
import useAlert from '../../../utils/useAlert'
import { getSecureItem } from '../../../utils/secureAccount'
import useMount from '../../../utils/useMount'
import { SignedInStackNavigationProp } from '../../../navigation/navigationRootTypes'
import { HotspotOnboardingStackParamList } from '../../../navigation/hotspotOnboardingNavigatorTypes'

type Route = RouteProp<HotspotOnboardingStackParamList, 'TxnProgressScreen'>

const TxnProgressScreen = () => {
  const { t } = useTranslation()
  const { params } = useRoute<Route>()
  const navigation = useNavigation<SignedInStackNavigationProp>()
  const { showOKAlert } = useAlert()

  const handleError = async (error: unknown) => {
    let titleKey = 'generic.error'
    let messageKey = 'generice.somethingWentWrong'

    if (isString(error)) {
      if (error === HotspotErrorCode.WAIT) {
        messageKey = t('hotspotOnboarding.txnProgressScreen.waitErrorBody')
        titleKey = t('hotspotOnboarding.txnProgressScreen.waitErrorTitle')
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
      Toast.showWithGravity(
        t('hotspotOnboarding.txnProgressScreen.linkCreationError'),
        Toast.LONG,
        Toast.CENTER,
      )
      return
    }

    const supported = await Linking.canOpenURL(url)
    if (supported) {
      await Linking.openURL(url)
    } else {
      Toast.showWithGravity(
        t('generic.openLinkError', { url }),
        Toast.LONG,
        Toast.CENTER,
      )
    }
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
      paddingBottom="l"
    >
      <Box flex={1} alignItems="center">
        <Text variant="subtitle1" marginBottom="l">
          {t('hotspotOnboarding.txnProgressScreen.title')}
        </Text>
        <Box flex={1}>
          <ActivityIndicatorCentered />
        </Box>
      </Box>
    </Box>
  )
}

export default TxnProgressScreen
