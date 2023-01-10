import React, { useRef } from 'react'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { useAsync } from 'react-async-hook'
import { useOnboarding } from '@helium/react-native-sdk'
import Box from '../../../components/Box'
import { DebouncedButton } from '../../../components/Button'
import Text from '../../../components/Text'
import { RootNavigationProp } from '../../../navigation/main/tabTypes'
import SafeAreaBox from '../../../components/SafeAreaBox'
import { HotspotSetupStackParamList } from './hotspotSetupTypes'

type Route = RouteProp<HotspotSetupStackParamList, 'HotspotTxnsSubmitScreen'>

const HotspotTxnsSubmitScreen = () => {
  const { t } = useTranslation()
  const { params } = useRoute<Route>()
  const navigation = useNavigation<RootNavigationProp>()
  const {
    submitAssertLocation,
    submitAddGateway,
    submitSolanaTransactions,
    submitTransferHotspot,
  } = useOnboarding()
  const submitted = useRef(false)

  useAsync(async () => {
    if (submitted.current) return

    if (!params.gatewayAddress) {
      throw new Error('Gateway address not found')
    }

    submitted.current = true

    if (params.gatewayTxn) {
      try {
        const { pendingTxn: pendingGatewayTxn } = await submitAddGateway({
          hotspotAddress: params.gatewayAddress,
          addGatewayTxn: params.gatewayTxn,
        })
        // eslint-disable-next-line no-console
        console.log({ pendingGatewayTxn })
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e)
      }
    }

    if (params.assertTxn) {
      try {
        const { pendingTxn: pendingAssertTxn } = await submitAssertLocation({
          assertLocationTxn: params.assertTxn,
          gateway: params.gatewayAddress,
        })

        // eslint-disable-next-line no-console
        console.log({ pendingAssertTxn })
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e)
      }
    }

    if (params.transferTxn) {
      try {
        const { pendingTxn: pendingTransferTxn } = await submitTransferHotspot({
          transferHotspotTxn: params.transferTxn,
        })
        // eslint-disable-next-line no-console
        console.log({ pendingTransferTxn })
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e)
      }
    }

    if (params.solanaTransactions) {
      try {
        const txns = params.solanaTransactions.split(',')
        const txnIds = await submitSolanaTransactions({
          solanaTransactions: txns,
        })
        // eslint-disable-next-line no-console
        console.log({ txnIds })
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e)
      }
    }
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
          <Text variant="body1" textAlign="center" marginBottom="l">
            {t('hotspot_setup.progress.subtitle')}
          </Text>
        </Box>
      </Box>
      <DebouncedButton
        onPress={() => navigation.navigate('MainTabs')}
        variant="primary"
        width="100%"
        mode="contained"
        title={t('hotspot_setup.progress.next')}
      />
    </SafeAreaBox>
  )
}

export default HotspotTxnsSubmitScreen
