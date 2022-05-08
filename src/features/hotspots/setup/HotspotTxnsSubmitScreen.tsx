import React from 'react'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { useAsync } from 'react-async-hook'
import { AssertLocationV2 } from '@helium/transactions'
import { useOnboarding } from '@helium/react-native-sdk'
import { useAnalytics } from '@segment/analytics-react-native'
import { useSelector } from 'react-redux'
import Box from '../../../components/Box'
import { DebouncedButton } from '../../../components/Button'
import Text from '../../../components/Text'
import { RootNavigationProp } from '../../../navigation/main/tabTypes'
import SafeAreaBox from '../../../components/SafeAreaBox'
import { HotspotSetupStackParamList } from './hotspotSetupTypes'
import { submitTxn } from '../../../utils/appDataClient'
import { HotspotEvents } from '../../../utils/analytics/events'
import { RootState } from '../../../store/rootReducer'

type Route = RouteProp<HotspotSetupStackParamList, 'HotspotTxnsSubmitScreen'>

const HotspotTxnsSubmitScreen = () => {
  const { t } = useTranslation()
  const { params } = useRoute<Route>()
  const navigation = useNavigation<RootNavigationProp>()
  const { postPaymentTransaction } = useOnboarding()

  const hotspotType = useSelector(
    (state: RootState) => state.hotspotOnboarding.hotspotType,
  )
  const hotspotName = useSelector(
    (state: RootState) => state.hotspotOnboarding.hotspotName,
  )
  const ownerAddress = useSelector(
    (state: RootState) => state.hotspotOnboarding.ownerAddress,
  )
  const makerName = useSelector(
    (state: RootState) => state.hotspotOnboarding.makerName,
  )
  const updateAntennaOnly = useSelector(
    (state: RootState) => state.hotspotOnboarding.updateAntennaOnly,
  )

  const { track } = useAnalytics()

  useAsync(async () => {
    if (!params.gatewayAddress) {
      throw new Error('Gateway address not found')
    }
    if (params.gatewayTxn) {
      const gatewayTxn = await postPaymentTransaction(
        params.gatewayAddress,
        params.gatewayTxn,
      )

      if (!gatewayTxn) {
        return
      }
      const pendingTxn = await submitTxn(gatewayTxn)

      // Segment track for add gateway
      track(HotspotEvents.ADD_GATEWAY_SUBMITTED, {
        hotspot_type: hotspotType,
        hotspot_address: params.gatewayAddress,
        hotspot_name: hotspotName,
        owner_address: ownerAddress,
        maker_name: makerName,
        pending_transaction: {
          type: pendingTxn.type,
          txn: pendingTxn.txn,
          status: pendingTxn.status,
          hash: pendingTxn.hash,
          failed_reason: pendingTxn.failedReason,
          created_at: pendingTxn.createdAt,
          updated_at: pendingTxn.updatedAt,
        },
      })
    }

    if (params.assertTxn) {
      let finalTxn = params.assertTxn
      const assertTxn = AssertLocationV2.fromString(finalTxn)

      const isFree = assertTxn.owner?.b58 !== assertTxn.payer?.b58 // Maker is paying
      if (isFree) {
        // If the maker is paying, post to onboarding
        const onboardAssertTxn = await postPaymentTransaction(
          params.gatewayAddress,
          params.assertTxn,
        )
        if (!onboardAssertTxn) return

        finalTxn = onboardAssertTxn
      }
      const pendingTxn = await submitTxn(finalTxn)

      // Segment track for assert location
      track(
        updateAntennaOnly
          ? HotspotEvents.UPDATE_ANTENNA_ONLY_SUBMITTED
          : HotspotEvents.ASSERT_LOCATION_SUBMITTED,
        {
          hotspot_type: hotspotType,
          hotspot_address: params.gatewayAddress,
          hotspot_name: hotspotName,
          owner_address: ownerAddress,
          maker_name: makerName,
          pending_transaction: {
            type: pendingTxn.type,
            txn: pendingTxn.txn,
            status: pendingTxn.status,
            hash: pendingTxn.hash,
            failed_reason: pendingTxn.failedReason,
            created_at: pendingTxn.createdAt,
            updated_at: pendingTxn.updatedAt,
          },
        },
      )
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
