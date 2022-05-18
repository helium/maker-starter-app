import React, { useCallback, useEffect, useState } from 'react'
import { ActivityIndicator, ScrollView } from 'react-native'
import { useTranslation } from 'react-i18next'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import {
  Balance,
  DataCredits,
  NetworkTokens,
  USDollars,
  useOnboarding,
} from '@helium/react-native-sdk'
import type { Account } from '@helium/http'
import { useAsync } from 'react-async-hook'
import { CurrencyType } from '@helium/currency'
import { calculateAssertLocFee } from '../../../utils/fees'
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
import { getAccount, getHotspotDetails } from '../../../utils/appDataClient'
import HotspotLocationPreview from './HotspotLocationPreview'
import { loadLocationFeeData } from '../../../utils/assertLocationUtils'

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
  const [transactionFeeData, setTransactionFeeData] = useState<{
    fee: Balance<DataCredits>
    stakingFee: Balance<DataCredits>
  }>()
  const { params } = useRoute<Route>()
  const { hotspotType, elevation, gain, coords } = params
  const { getOnboardingRecord } = useOnboarding()

  // Check if onboarding workflow or assert location workflow
  const isAssertion = !hotspotType

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
    // handle exception when onboarding record is not found (Non Nebra hotspots)
    let onboardingRecord
    try {
      onboardingRecord = await getOnboardingRecord(params.hotspotAddress)
    } catch (error) {}

    let hotspot
    try {
      hotspot = await getHotspotDetails(params.hotspotAddress)
    } catch (error) {}

    if (!ownerAddress || !account?.balance) {
      return
    }

    const feeParams = {
      nonce: hotspot?.nonce || 0,
      accountIntegerBalance: account.balance.integerBalance,
      onboardingRecord,
      dataOnly: false,
    }
    if (params.updateAntennaOnly) {
      // Generate Helium transaction fee
      const { fee, stakingFee } = calculateAssertLocFee(
        undefined,
        undefined,
        undefined,
      )
      setTransactionFeeData({
        fee: new Balance(fee, CurrencyType.dataCredit),
        stakingFee: new Balance(stakingFee, CurrencyType.dataCredit),
      })
    }
    loadLocationFeeData(feeParams).then(setFeeData)
  }, [ownerAddress, account, getOnboardingRecord, params.hotspotAddress])

  const navNext = useCallback(async () => {
    navigation.replace('HotspotTxnsProgressScreen', {
      ...params,
      isAssertion,
    })
  }, [isAssertion, navigation, params])

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
          {params.updateAntennaOnly ? (
            <Box>
              <Text variant="h1" marginBottom="l" maxFontSizeMultiplier={1}>
                {t('hotspot_setup.antenna_only_fee.title')}
              </Text>

              <Text
                variant="subtitle1"
                color="primaryText"
                marginBottom={{ phone: 'xl', smallPhone: 'ms' }}
                numberOfLines={2}
                adjustsFontSizeToFit
                maxFontSizeMultiplier={1.3}
                paddingBottom="xxl"
              >
                {t('hotspot_setup.antenna_only_fee.confirm_antenna')}
              </Text>
            </Box>
          ) : (
            <Box>
              <Text variant="h1" marginBottom="l" maxFontSizeMultiplier={1}>
                {t('hotspot_setup.location_fee.title')}
              </Text>
              {isFree ? (
                <Text
                  variant="subtitle1"
                  color="primaryText"
                  marginBottom={{ phone: 'l', smallPhone: 'ms' }}
                >
                  {t('hotspot_setup.location_fee.subtitle_free')}
                </Text>
              ) : (
                <Text
                  variant="subtitle1"
                  color="primaryText"
                  marginBottom={{ phone: 'l', smallPhone: 'ms' }}
                >
                  {t('hotspot_setup.location_fee.subtitle_fee')}
                </Text>
              )}
              <Text
                variant="subtitle1"
                color="primaryText"
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
            </Box>
          )}

          <Box
            flexDirection="row"
            justifyContent="space-between"
            marginTop={{ phone: 'm', smallPhone: 'xxs' }}
          >
            <Text variant="body1" color="primaryText">
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
            <Text variant="body1" color="primaryText">
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
                <Text variant="body1" color="primaryText">
                  {t('hotspot_setup.location_fee.balance')}
                </Text>
                <Text
                  variant="body1"
                  color={hasSufficientBalance ? 'primaryText' : 'error'}
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
                <Text variant="body1" color="primaryText">
                  {t('hotspot_setup.location_fee.fee')}
                </Text>
                {params.updateAntennaOnly ? (
                  <Text variant="body1" color="primaryText">
                    {transactionFeeData?.fee.toString(2)}
                  </Text>
                ) : (
                  <Text variant="body1" color="primaryText">
                    {totalStakingAmount.toString(2)}
                  </Text>
                )}
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
        {params.updateAntennaOnly ? (
          <DebouncedButton
            title={t('hotspot_setup.antenna_only_fee.fee_antenna')}
            mode="contained"
            variant="primary"
            onPress={navNext}
            disabled={isFree ? false : !hasSufficientBalance}
          />
        ) : (
          <>
            {isAssertion ? (
              <DebouncedButton
                title={
                  isFree
                    ? t('hotspot_setup.location_fee.assert')
                    : t('hotspot_setup.location_fee.fee_assert')
                }
                mode="contained"
                variant="primary"
                onPress={navNext}
                disabled={isFree ? false : !hasSufficientBalance}
              />
            ) : (
              <DebouncedButton
                title={
                  isFree
                    ? t('hotspot_setup.location_fee.register')
                    : t('hotspot_setup.location_fee.fee_register')
                }
                mode="contained"
                variant="primary"
                onPress={navNext}
                disabled={isFree ? false : !hasSufficientBalance}
              />
            )}
          </>
        )}
      </Box>
    </BackScreen>
  )
}

export default HotspotSetupConfirmLocationScreen
