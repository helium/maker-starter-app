import React, { useCallback, useEffect, useState } from 'react'
import { ActivityIndicator, ScrollView } from 'react-native'
import { useTranslation } from 'react-i18next'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import {
  Balance,
  DataCredits,
  Location,
  NetworkTokens,
  USDollars,
  useOnboarding,
} from '@helium/react-native-sdk'
import type { Account } from '@helium/http'
import { useAsync } from 'react-async-hook'
import {
  HotspotSetupNavigationProp,
  HotspotSetupStackParamList,
} from './hotspotSetupTypes'
import BackScreen from '../../../components/BackScreen'
import Box from '../../../components/Box'
import { DebouncedButton } from '../../../components/Button'
import Text from '../../../components/Text'
import { decimalSeparator, groupSeparator } from '../../../utils/i18n'
import { RootNavigationProp } from '../../../navigation/main/tabTypes'
import { getAddress } from '../../../utils/secureAccount'
import { getAccount } from '../../../utils/appDataClient'
import HotspotLocationPreview from './HotspotLocationPreview'

type Route = RouteProp<
  HotspotSetupStackParamList,
  'HotspotSetupConfirmLocationScreen'
>

const HotspotSetupConfirmLocationScreen = () => {
  const { t } = useTranslation()
  const navigation = useNavigation<HotspotSetupNavigationProp>()
  const rootNav = useNavigation<RootNavigationProp>()
  const [account, setAccount] = useState<Account>()
  const [ownerAddress, setOwnerAddress] = useState<string | null>(null)
  const [feeData, setFeeData] = useState<{
    isFree: boolean
    hasSufficientBalance: boolean
    remainingFreeAsserts: number
    totalStakingAmount: Balance<NetworkTokens>
    totalStakingAmountDC: Balance<DataCredits>
    totalStakingAmountUsd: Balance<USDollars>
  }>()
  const { params } = useRoute<Route>()
  const { elevation, gain, coords } = params
  const { getOnboardingRecord } = useOnboarding()

  useAsync(async () => {
    const address = await getAddress()
    if (!address) return
    setOwnerAddress(address)
  }, [])

  useEffect(() => {
    if (!ownerAddress) return
    getAccount(ownerAddress).then(setAccount)
  }, [ownerAddress])

  useAsync(async () => {
    const onboardingRecord = await getOnboardingRecord(params.hotspotAddress)
    if (!onboardingRecord || !ownerAddress || !account?.balance) {
      return
    }

    Location.loadLocationFeeData({
      nonce: 0,
      accountIntegerBalance: account.balance.integerBalance,
      dataOnly: false,
      owner: ownerAddress,
      locationNonceLimit: onboardingRecord.maker.locationNonceLimit,
      makerAddress: onboardingRecord.maker.address,
    }).then(setFeeData)
  }, [ownerAddress, account, getOnboardingRecord, params.hotspotAddress])

  const navNext = useCallback(async () => {
    navigation.replace('HotspotTxnsProgressScreen', params)
  }, [navigation, params])

  const handleClose = useCallback(() => rootNav.navigate('MainTabs'), [rootNav])

  if (!feeData) {
    return (
      <BackScreen onClose={handleClose}>
        <Box flex={1} justifyContent="center" paddingBottom="xxl">
          <ActivityIndicator color="#687A8C" />
        </Box>
      </BackScreen>
    )
  }

  const { isFree, hasSufficientBalance, totalStakingAmount } = feeData

  return (
    <BackScreen onClose={handleClose}>
      <ScrollView>
        <Box flex={1} justifyContent="center" paddingBottom="xxl">
          <Text variant="h1" marginBottom="l" maxFontSizeMultiplier={1}>
            {t('hotspot_setup.location_fee.title')}
          </Text>
          {isFree ? (
            <Text
              variant="subtitle1"
              marginBottom={{ phone: 'l', smallPhone: 'ms' }}
            >
              {t('hotspot_setup.location_fee.subtitle_free')}
            </Text>
          ) : (
            <Text
              variant="subtitle1"
              marginBottom={{ phone: 'l', smallPhone: 'ms' }}
            >
              {t('hotspot_setup.location_fee.subtitle_fee')}
            </Text>
          )}
          <Text
            variant="subtitle1"
            marginBottom={{ phone: 'xl', smallPhone: 'ms' }}
            numberOfLines={2}
            adjustsFontSizeToFit
            maxFontSizeMultiplier={1.3}
          >
            {t('hotspot_setup.location_fee.confirm_location')}
          </Text>
          <Box
            height={200}
            borderRadius="l"
            overflow="hidden"
            marginBottom={{ phone: 'm', smallPhone: 'ms' }}
          >
            <HotspotLocationPreview
              mapCenter={coords}
              locationName={params.locationName}
            />
          </Box>

          <Box
            flexDirection="row"
            justifyContent="space-between"
            marginTop={{ phone: 'm', smallPhone: 'xxs' }}
          >
            <Text variant="body1" color="secondaryText">
              {t('hotspot_setup.location_fee.gain_label')}
            </Text>
            <Text variant="body1" color="primaryText">
              {t('hotspot_setup.location_fee.gain', { gain })}
            </Text>
          </Box>

          <Box
            flexDirection="row"
            justifyContent="space-between"
            marginTop={{ phone: 'm', smallPhone: 'xxs' }}
          >
            <Text variant="body1" color="secondaryText">
              {t('hotspot_setup.location_fee.elevation_label')}
            </Text>
            <Text variant="body1" color="primaryText">
              {t('hotspot_setup.location_fee.elevation', { count: elevation })}
            </Text>
          </Box>

          {!isFree && (
            <>
              <Box
                flexDirection="row"
                justifyContent="space-between"
                paddingTop="m"
                marginTop={{ phone: 'm', smallPhone: 'xxs' }}
              >
                <Text variant="body1" color="secondaryText">
                  {t('hotspot_setup.location_fee.balance')}
                </Text>
                <Text
                  variant="body1"
                  color={hasSufficientBalance ? 'secondaryText' : 'error'}
                >
                  {account?.balance?.toString(2, {
                    groupSeparator,
                    decimalSeparator,
                  })}
                </Text>
              </Box>

              <Box
                flexDirection="row"
                justifyContent="space-between"
                marginTop={{ phone: 'm', smallPhone: 'xxs' }}
              >
                <Text variant="body1" color="secondaryText">
                  {t('hotspot_setup.location_fee.fee')}
                </Text>
                <Text variant="body1" color="primaryText">
                  {totalStakingAmount.toString(2)}
                </Text>
              </Box>

              {!hasSufficientBalance && (
                <Box marginTop={{ phone: 'l', smallPhone: 'xxs' }}>
                  <Text variant="body2" color="error" textAlign="center">
                    {t('hotspot_setup.location_fee.no_funds')}
                  </Text>
                </Box>
              )}
            </>
          )}
        </Box>
      </ScrollView>
      <Box>
        <DebouncedButton
          title={
            isFree
              ? t('hotspot_setup.location_fee.next')
              : t('hotspot_setup.location_fee.fee_next')
          }
          mode="contained"
          variant="secondary"
          onPress={navNext}
          disabled={isFree ? false : !hasSufficientBalance}
        />
      </Box>
    </BackScreen>
  )
}

export default HotspotSetupConfirmLocationScreen
