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
} from '@helium/react-native-sdk'
import type { Account } from '@helium/http'
import {
  HotspotSetupNavigationProp,
  HotspotSetupStackParamList,
} from './hotspotSetupTypes'
import BackScreen from '../../../components/BackScreen'
import Box from '../../../components/Box'
import ImageBox from '../../../components/ImageBox'
import { DebouncedButton } from '../../../components/Button'
import Map from '../../../components/Map'
import Text from '../../../components/Text'
import { decimalSeparator, groupSeparator } from '../../../utils/i18n'
import { RootNavigationProp } from '../../../navigation/main/tabTypes'
import { getSecureItem } from '../../../utils/secureAccount'
import { getAccount } from '../../../utils/appDataClient'

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
  const { onboardingRecord, elevation, gain, coords } = params

  useEffect(() => {
    getSecureItem('address').then(setOwnerAddress)
  }, [])

  useEffect(() => {
    if (!ownerAddress) return
    getAccount(ownerAddress).then(setAccount)
  }, [ownerAddress])

  useEffect(() => {
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
  }, [onboardingRecord, ownerAddress, account])

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
            height={{ smallPhone: 140, phone: 200 }}
            borderRadius="l"
            overflow="hidden"
            marginBottom={{ phone: 'm', smallPhone: 'ms' }}
          >
            <Box flex={1}>
              <Map mapCenter={coords} zoomLevel={16} interactive={false} />
              <Box
                position="absolute"
                top="50%"
                left="50%"
                style={{ marginTop: -29, marginLeft: -25 / 2 }}
                width={25}
                height={29}
                justifyContent="flex-end"
                alignItems="center"
              >
                <ImageBox
                  source={require('../../../assets/images/map-pin.png')}
                  width={25}
                  height={29}
                />
              </Box>
            </Box>
            <Box padding="m" backgroundColor="secondaryBackground">
              <Text variant="body2" numberOfLines={1} adjustsFontSizeToFit>
                {params.locationName}
              </Text>
            </Box>
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
