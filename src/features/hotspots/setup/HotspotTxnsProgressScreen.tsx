import React, { useCallback } from 'react'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { ActivityIndicator, Linking, Platform } from 'react-native'
import { createUpdateHotspotUrl, SignHotspotRequest } from '@helium/wallet-link'
import { useOnboarding } from '@helium/react-native-sdk'
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
import { getHotpotTypes } from '../root/hotspotTypes'

type Route = RouteProp<HotspotSetupStackParamList, 'HotspotTxnsProgressScreen'>

const HotspotTxnsProgressScreen = () => {
  const { t } = useTranslation()
  const { params } = useRoute<Route>()
  const navigation = useNavigation<RootNavigationProp>()
  const { primaryText } = useColors()
  const { createHotspot, getOnboardTransactions, getOnboardingRecord } =
    useOnboarding()

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
        platform: Platform.OS,
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
        // eslint-disable-next-line no-console
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
    await createHotspot(params.addGatewayTxn)

    const onboardingRecord = await getOnboardingRecord(params.hotspotAddress)

    /*
         TODO: Determine which network types this hotspot supports
         Could possibly use the maker address
      */
    const hotspotTypes = getHotpotTypes({
      hotspotMakerAddress: onboardingRecord?.maker.address || '',
    })

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
  }, [
    createHotspot,
    getOnboardTransactions,
    getOnboardingRecord,
    navToHeliumAppForSigning,
    params,
  ])

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
