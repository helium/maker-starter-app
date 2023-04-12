/* eslint-disable no-console */
import React, { useCallback, useRef, useState } from 'react'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { useAsync } from 'react-async-hook'
import { useOnboarding } from '@helium/react-native-sdk'
import { Linking } from 'react-native'
import Box from '../../../components/Box'
import { DebouncedButton } from '../../../components/Button'
import Text from '../../../components/Text'
import { RootNavigationProp } from '../../../navigation/main/tabTypes'
import SafeAreaBox from '../../../components/SafeAreaBox'
import { HotspotSetupStackParamList } from './hotspotSetupTypes'
import TouchableOpacityBox from '../../../components/TouchableOpacityBox'
import ActivityIndicator from '../../../components/ActivityIndicator'

type Route = RouteProp<HotspotSetupStackParamList, 'HotspotTxnsSubmitScreen'>

const HotspotTxnsSubmitScreen = () => {
  const { t } = useTranslation()
  const { params } = useRoute<Route>()
  const navigation = useNavigation<RootNavigationProp>()
  const { submitTransactions } = useOnboarding()
  const submitted = useRef(false)
  const [state, setState] = useState<'init' | 'loading' | 'success' | 'error'>(
    'init',
  )
  const [error, setError] = useState('')
  const [pendingGatewayTxn, setPendingGatewayTxn] = useState<string>()
  const [pendingTransferTxn, setPendingTransferTxn] = useState<string>()
  const [pendingAssertTxn, setPendingAssertTxn] = useState<string>()

  useAsync(async () => {
    if (submitted.current) return

    if (!params.gatewayAddress) {
      throw new Error('Gateway address not found')
    }

    submitted.current = true

    let solanaTransactions: string[] = []
    if (params.solanaTransactions) {
      solanaTransactions = params.solanaTransactions?.split(',') || []
    }

    setState('loading')

    try {
      const txnIds = await submitTransactions({
        addGatewayTxn: params.gatewayTxn,
        assertLocationTxn: params.assertTxn,
        hotspotAddress: params.gatewayAddress,
        solanaTransactions,
        transferHotspotTxn: params.transferTxn,
      })
      setState('success')

      setPendingGatewayTxn(txnIds.pendingGatewayTxn?.hash)
      setPendingAssertTxn(txnIds.pendingAssertTxn?.hash)
      setPendingTransferTxn(txnIds.pendingTransferTxn?.hash)
    } catch (e) {
      setState('error')
      setError(String(e))
      console.error(e)
    }
  }, [])

  const viewPending = useCallback(
    (hash: string) => () => {
      Linking.openURL(`https://api.helium.io/v1/pending_transactions/${hash}`)
    },
    [],
  )

  return (
    <SafeAreaBox
      flex={1}
      backgroundColor="primaryBackground"
      padding="lx"
      paddingTop="xxl"
    >
      {state === 'loading' && (
        <Box flex={1} alignItems="center" justifyContent="center">
          <ActivityIndicator />
        </Box>
      )}
      {state === 'success' && (
        <>
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
          {pendingGatewayTxn && (
            <TouchableOpacityBox
              onPress={viewPending(pendingGatewayTxn)}
              paddingVertical="lx"
              alignSelf="center"
            >
              <Text variant="body1">
                {t('hotspot_setup.progress.view_pending_add')}
              </Text>
            </TouchableOpacityBox>
          )}
          {pendingAssertTxn && (
            <TouchableOpacityBox
              onPress={viewPending(pendingAssertTxn)}
              paddingVertical="lx"
              alignSelf="center"
            >
              <Text variant="body1">
                {t('hotspot_setup.progress.view_pending_assert')}
              </Text>
            </TouchableOpacityBox>
          )}
        </>
      )}
      {pendingTransferTxn && (
        <TouchableOpacityBox
          onPress={viewPending(pendingTransferTxn)}
          paddingVertical="lx"
          alignSelf="center"
        >
          <Text variant="body1">
            {t('hotspot_setup.progress.view_pending_transfer')}
          </Text>
        </TouchableOpacityBox>
      )}

      {state === 'error' && (
        <>
          <Box flex={1} alignItems="center" paddingTop="xxl">
            <Text variant="subtitle1" marginBottom="l">
              {t('generic.something_went_wrong')}
            </Text>
            <Box paddingHorizontal="l">
              <Text variant="body1" textAlign="center" marginBottom="l">
                {error}
              </Text>
            </Box>
          </Box>
        </>
      )}
      <DebouncedButton
        onPress={() => navigation.navigate('MainTabs')}
        marginTop="lx"
        variant="primary"
        width="100%"
        mode="contained"
        title={t('hotspot_setup.progress.next')}
      />
    </SafeAreaBox>
  )
}

export default HotspotTxnsSubmitScreen
