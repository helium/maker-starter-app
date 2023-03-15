import React, { useCallback } from 'react'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { ActivityIndicator, Linking, Platform } from 'react-native'
import { createUpdateHotspotUrl, SignHotspotRequest } from '@helium/wallet-link'
import {
  AddGatewayV1,
  AssertLocationV2,
  TransferHotspotV2,
  useOnboarding,
} from '@helium/react-native-sdk'
import { first, last } from 'lodash'
import { useAsync } from 'react-async-hook'
import { bufferToTransaction, getSolanaKeypair } from '@helium/spl-utils'
import Box from '../../../components/Box'
import Text from '../../../components/Text'
import { RootNavigationProp } from '../../../navigation/main/tabTypes'
import SafeAreaBox from '../../../components/SafeAreaBox'
import { HotspotSetupStackParamList } from './hotspotSetupTypes'
import {
  getKeypair,
  getKeypairRaw,
  getSecureItem,
} from '../../../utils/secureAccount'
import { useColors } from '../../../theme/themeHooks'
import { DebouncedButton } from '../../../components/Button'
import useMount from '../../../utils/useMount'
import { HotspotAssertNavigationProp } from './HotspotAssertTypes'
import { getHotspotTypes } from '../root/hotspotTypes'

type Route = RouteProp<HotspotSetupStackParamList, 'HotspotTxnsProgressScreen'>

const HotspotTxnsProgressScreen = () => {
  const { t } = useTranslation()
  const { params } = useRoute<Route>()
  const rootNav = useNavigation<RootNavigationProp>()
  const nav = useNavigation<HotspotAssertNavigationProp>()
  const { primaryText } = useColors()
  const { createHotspot, getOnboardTransactions, getOnboardingRecord } =
    useOnboarding()
  const { result: token } = useAsync(getSecureItem, ['walletLinkToken'])

  const navToHeliumAppForSigning = useCallback(
    async (updateParams: SignHotspotRequest) => {
      const url = createUpdateHotspotUrl(updateParams)
      if (!url) {
        // eslint-disable-next-line no-console
        console.error('Link could not be created')
        return
      }

      Linking.openURL(url)
    },
    [],
  )

  const signTxn = useCallback(
    async ({
      addGatewayTxn,
      solanaTransactions,
      transferHotspotTxn,
      assertLocationTxn,
    }: SignHotspotRequest) => {
      const keypair = await getKeypair()

      const keypairRaw = await getKeypairRaw()
      if (!keypairRaw || !keypair) {
        throw new Error('keypair not found!')
      }

      let solanaSignedTransactions: string[] = []
      let gatewayTxn: string | undefined
      let assertTxn: string | undefined
      let transferTxn: string | undefined

      if (addGatewayTxn) {
        const unsigned = AddGatewayV1.fromString(addGatewayTxn)
        const signed = await unsigned.sign({ owner: keypair })
        gatewayTxn = signed.toString()
      }

      if (assertLocationTxn) {
        const unsigned = AssertLocationV2.fromString(assertLocationTxn)
        const ownerIsPayer = unsigned.owner?.b58 === unsigned.payer?.b58
        const signed = await unsigned.sign({
          owner: keypair,
          payer: ownerIsPayer ? keypair : undefined,
        })
        assertTxn = signed.toString()
      }

      if (transferHotspotTxn) {
        const unsigned = TransferHotspotV2.fromString(transferHotspotTxn)
        const signed = await unsigned.sign({ owner: keypair })
        transferTxn = signed.toString()
      }

      if (solanaTransactions) {
        const solTxns = solanaTransactions.split(',')
        const solanaKeypair = getSolanaKeypair(keypairRaw.sk)
        solanaSignedTransactions = solTxns.map((txn) => {
          const tx = bufferToTransaction(Buffer.from(txn, 'base64'))
          tx.partialSign(solanaKeypair)
          return tx.serialize().toString('base64')
        })
      }
      nav.navigate('HotspotTxnsSubmitScreen', {
        gatewayTxn,
        assertTxn,
        gatewayAddress: params.hotspotAddress,
        transferTxn,
        solanaTransactions: solanaSignedTransactions.join(','),
        status: 'success',
      })
    },
    [nav, params.hotspotAddress],
  )

  const handleTxns = useCallback(
    (onboardTransactions?: string[]) => {
      const solanaTransactions = [
        ...(onboardTransactions || []),
        ...(params.solanaTransactions || []),
      ].join(',')

      const updateParams = {
        token,
        platform: Platform.OS,
      } as SignHotspotRequest

      if (solanaTransactions.length) {
        updateParams.solanaTransactions = solanaTransactions
      } else {
        updateParams.addGatewayTxn = params.addGatewayTxn
        updateParams.assertLocationTxn = params.assertLocationTxn
      }

      if (token) {
        navToHeliumAppForSigning(updateParams)
      } else {
        signTxn(updateParams)
      }
    },
    [params, token, navToHeliumAppForSigning, signTxn],
  )

  const handleAddGateway = useCallback(async () => {
    if (!params.addGatewayTxn || !params.hotspotAddress) return

    // This creates the hotspot, signing not required
    await createHotspot(params.addGatewayTxn)

    const onboardingRecord = await getOnboardingRecord(params.hotspotAddress)
    let networkTypes = params.hotspotNetworkTypes
    if (!networkTypes) {
      networkTypes = getHotspotTypes(onboardingRecord?.maker.name)
    }

    const { solanaTransactions } = await getOnboardTransactions({
      txn: params.addGatewayTxn,
      hotspotAddress: params.hotspotAddress,
      hotspotTypes: networkTypes,
      lat: last(params.coords),
      lng: first(params.coords),
      elevation: params.elevation,
      decimalGain: params.gain,
    })
    if (!solanaTransactions) return

    handleTxns(solanaTransactions)
  }, [
    createHotspot,
    getOnboardTransactions,
    getOnboardingRecord,
    handleTxns,
    params,
  ])

  useMount(() => {
    if (params.addGatewayTxn) {
      handleAddGateway()
    } else {
      handleTxns()
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
        onPress={() => rootNav.navigate('MainTabs')}
        variant="primary"
        width="100%"
        mode="contained"
        title={t('generic.cancel')}
      />
    </SafeAreaBox>
  )
}

export default HotspotTxnsProgressScreen
