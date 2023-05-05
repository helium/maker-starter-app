/* eslint-disable no-console */
import React, { useCallback } from 'react'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { ActivityIndicator, Linking } from 'react-native'
import { createUpdateHotspotUrl, SignHotspotRequest } from '@helium/wallet-link'
import {
  AlreadyOnboardedError,
  CreateHotspotExistsError,
  useOnboarding,
} from '@helium/react-native-sdk'
import { first, last } from 'lodash'
import Box from '../../../components/Box'
import Text from '../../../components/Text'
import { RootNavigationProp } from '../../../navigation/main/tabTypes'
import SafeAreaBox from '../../../components/SafeAreaBox'
import { HotspotSetupStackParamList } from './hotspotSetupTypes'
import { getSecureItem } from '../../../utils/secureAccount'
import { useColors } from '../../../theme/themeHooks'
import { DebouncedButton } from '../../../components/Button'
import useMount from '../../../utils/useMount'
import { getHotspotTypes } from '../root/hotspotTypes'

type Route = RouteProp<HotspotSetupStackParamList, 'HotspotTxnsProgressScreen'>

const HotspotTxnsProgressScreen = () => {
  const { t } = useTranslation()
  const { params } = useRoute<Route>()
  const navigation = useNavigation<RootNavigationProp>()
  const { primaryText } = useColors()
  const { createHotspot, getOnboardTransactions } = useOnboarding()

  const navToHeliumAppForSigning = useCallback(
    async (opts?: {
      onboardTransactions?: string[]
      addGatewayTxn?: string
      assertLocationTxn?: string
    }) => {
      const token = await getSecureItem('walletLinkToken')
      if (!token) throw new Error('Token Not found')

      const solanaTransactions = [
        ...(opts?.onboardTransactions || []),
        ...(params.solanaTransactions || []),
      ].join(',')

      const updateParams = {
        token,
      } as SignHotspotRequest

      if (solanaTransactions.length) {
        updateParams.solanaTransactions = solanaTransactions
      } else {
        updateParams.addGatewayTxn = opts?.addGatewayTxn || params.addGatewayTxn
        updateParams.assertLocationTxn =
          opts?.assertLocationTxn || params.assertLocationTxn
      }

      const url = createUpdateHotspotUrl(updateParams)
      if (!url) {
        console.error('Link could not be created')
        return
      }

      Linking.openURL(url)
    },
    [params],
  )

  const handleAddGateway = useCallback(async () => {
    if (!params.addGatewayTxn || !params.hotspotAddress) return

    // This creates the hotspot, signing not required
    try {
      const txnIds = await createHotspot(params.addGatewayTxn)
      if (!txnIds.length) {
        throw new Error('Failed to create hotspot!')
      }
    } catch (e) {
      if (e !== CreateHotspotExistsError) {
        console.error(e)
        throw e
      }
      // if the hotspot has already been created, carry on and try to onboard
    }

    /*
         TODO: Determine which network types this hotspot supports
         Could possibly use the maker address
      */
    const hotspotTypes = getHotspotTypes()

    // getOnboardTransactions will throw an error if the hotspot has already
    // been onboarded to all of the provided network types
    try {
      const { solanaTransactions } = await getOnboardTransactions({
        hotspotAddress: params.hotspotAddress,
        hotspotTypes,
        lat: last(params.coords),
        lng: first(params.coords),
        elevation: params.elevation,
        decimalGain: params.gain,
      })

      navToHeliumAppForSigning({
        onboardTransactions: solanaTransactions,
      })
    } catch (e) {
      console.error(e)

      if (e === AlreadyOnboardedError) {
        // TODO: handle already onboarded error
        console.log('TODO: handle already onboarded error')
      } else {
        // TODO: handle generic error
        console.log('TODO: handle generic onboarding error')
      }
    }
  }, [createHotspot, getOnboardTransactions, navToHeliumAppForSigning, params])

  useMount(() => {
    if (params.addGatewayTxn) {
      handleAddGateway()
    } else {
      navToHeliumAppForSigning()
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
