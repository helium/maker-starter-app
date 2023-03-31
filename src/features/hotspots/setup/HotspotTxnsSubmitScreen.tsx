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
  const { submitTransactions } = useOnboarding()
  const submitted = useRef(false)

  useAsync(async () => {
    if (submitted.current) return

    if (!params.gatewayAddress) {
      throw new Error('Gateway address not found')
    }

    submitted.current = true

    const solanaTransactions = params.solanaTransactions?.split(',') || []
    try {
      const {
        pendingAssertTxn,
        pendingGatewayTxn,
        pendingTransferTxn,
        solanaTxnIds,
      } = await submitTransactions({
        addGatewayTxn: params.gatewayTxn,
        assertLocationTxn: params.assertTxn,
        hotspotAddress: params.gatewayAddress,
        solanaTransactions,
        transferHotspotTxn: params.transferTxn,
      })

      // eslint-disable-next-line no-console
      console.log({
        pendingAssertTxn,
        pendingGatewayTxn,
        pendingTransferTxn,
        solanaTxnIds,
      })
    } catch (e) {
      console.log({ e })
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
          {params.gatewayTxn
            ? t('hotspot_setup.onboard.title')
            : t('hotspot_setup.update.title')}
        </Text>
        <Box paddingHorizontal="l">
          <Text variant="body1" textAlign="center" marginBottom="l">
            {params.gatewayTxn
              ? t('hotspot_setup.onboard.subtitle')
              : t('hotspot_setup.update.subtitle')}
          </Text>
        </Box>
      </Box>
      <DebouncedButton
        onPress={() => navigation.navigate('MainTabs')}
        variant="primary"
        width="100%"
        mode="contained"
        title={
          params.gatewayTxn
            ? t('hotspot_setup.onboard.next')
            : t('hotspot_setup.update.next')
        }
      />
    </SafeAreaBox>
  )
}

export default HotspotTxnsSubmitScreen
