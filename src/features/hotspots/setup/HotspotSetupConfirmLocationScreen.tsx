import React, { useCallback, useMemo, useState } from 'react'
import { ActivityIndicator, ScrollView } from 'react-native'
import { useTranslation } from 'react-i18next'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { useOnboarding, AssertData, useSolana } from '@helium/react-native-sdk'
import { useAsync } from 'react-async-hook'
import { first, last } from 'lodash'
import animalName from 'angry-purple-tiger'
import {
  HotspotSetupNavigationProp,
  HotspotSetupStackParamList,
} from './hotspotSetupTypes'
import BackScreen from '../../../components/BackScreen'
import Box from '../../../components/Box'
import { DebouncedButton } from '../../../components/Button'
import Text from '../../../components/Text'
import { RootNavigationProp } from '../../../navigation/main/tabTypes'
import { getAddress } from '../../../utils/secureAccount'
import HotspotLocationPreview from './HotspotLocationPreview'
import { useSpacing } from '../../../theme/themeHooks'
import { getHotspotTypes } from '../root/hotspotTypes'

type Route = RouteProp<
  HotspotSetupStackParamList,
  'HotspotSetupConfirmLocationScreen'
>

const HotspotSetupConfirmLocationScreen = () => {
  const { t } = useTranslation()
  const navigation = useNavigation<HotspotSetupNavigationProp>()
  const rootNav = useNavigation<RootNavigationProp>()
  const [assertData, setAssertData] = useState<AssertData>()
  const { getStatus } = useSolana()
  const [isFree, setIsFree] = useState<boolean>()
  const [assertLocationTxn, setAssertLocationTxn] = useState<string>()
  const [solanaTransactions, setSolanaTransactions] = useState<string[]>()
  const { result: status } = useAsync(getStatus, [])
  const { params } = useRoute<Route>()
  const spacing = useSpacing()
  const {
    getAssertData,
    getOnboardingRecord,
    getOnboardTransactions,
    getHotspotDetails,
  } = useOnboarding()

  useAsync(async () => {
    const { elevation, gain, coords } = params

    const userAddress = await getAddress()

    const lat = last(coords)
    const lng = first(coords)

    if (!lat || !lng || !userAddress) return

    try {
      const onboardingRecord = await getOnboardingRecord(params.hotspotAddress)
      let networkTypes = params.hotspotNetworkTypes
      if (!networkTypes) {
        networkTypes = getHotspotTypes(onboardingRecord?.maker.name)
      }

      const locationParams = {
        decimalGain: gain,
        elevation,
        lat,
        lng,
      }
      if (params.addGatewayTxn) {
        setIsFree(true)
      } else {
        const hotspotDetails = await getHotspotDetails({
          address: params.hotspotAddress,
          type: networkTypes[0],
        })
        const hotspotExists = !!hotspotDetails
        if (hotspotExists) {
          const assert = await getAssertData({
            ...locationParams,
            gateway: params.hotspotAddress,
            owner: userAddress,
            onboardingRecord,
            hotspotTypes: networkTypes,
          })

          setAssertData(assert)
          setAssertLocationTxn(assert.assertLocationTxn)
          setSolanaTransactions(assert.solanaTransactions)
          setIsFree(assert.isFree)
        } else {
          // Edge case - hotspot hasn't been onboarded yet
          const onboard = await getOnboardTransactions({
            txn: '',
            hotspotAddress: params.hotspotAddress,
            hotspotTypes: networkTypes,
            ...locationParams,
          })
          setSolanaTransactions(onboard.solanaTransactions)
          setIsFree(true)
        }
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
    }
  }, [getAssertData, params])

  const disabled = useMemo(() => {
    if (isFree) return false

    return !assertData?.hasSufficientBalance
  }, [assertData, isFree])

  const navNext = useCallback(async () => {
    navigation.replace('HotspotTxnsProgressScreen', {
      addGatewayTxn: params.addGatewayTxn,
      assertLocationTxn: assertLocationTxn || '',
      solanaTransactions: solanaTransactions || [],
      hotspotAddress: params.hotspotAddress,
      coords: params.coords,
      elevation: params.elevation,
      gain: params.gain,
      hotspotNetworkTypes: params.hotspotNetworkTypes,
    })
  }, [assertLocationTxn, navigation, params, solanaTransactions])

  const handleClose = useCallback(() => rootNav.navigate('MainTabs'), [rootNav])

  if (isFree === undefined) {
    return (
      <Box flex={1} alignItems="center" justifyContent="center">
        <ActivityIndicator color="primaryText" />
      </Box>
    )
  }

  return (
    <BackScreen onClose={handleClose} padding="none">
      <ScrollView style={{ padding: spacing.lx }}>
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

          <Text
            variant="subtitle1"
            marginTop="s"
            marginBottom={{ phone: 'xl', smallPhone: 'ms' }}
            numberOfLines={1}
            adjustsFontSizeToFit
            maxFontSizeMultiplier={1.3}
            textAlign="center"
          >
            {animalName(params.hotspotAddress)}
          </Text>
          <Box
            height={200}
            borderRadius="l"
            overflow="hidden"
            marginBottom={{ phone: 'm', smallPhone: 'ms' }}
          >
            <HotspotLocationPreview
              mapCenter={params.coords}
              locationName={params.locationName}
            />
          </Box>

          <Box flexDirection="row" justifyContent="space-between">
            <Text variant="body1" color="primaryText">
              {t('hotspot_setup.location_fee.gain_label')}
            </Text>
            <Text variant="body1" color="primaryText">
              {t('hotspot_setup.location_fee.gain', { gain: params.gain })}
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
              {t('hotspot_setup.location_fee.elevation', {
                count: params.elevation,
              })}
            </Text>
          </Box>

          {!isFree && (
            <>
              <Box
                flexDirection="row"
                justifyContent="space-between"
                paddingTop="m"
              >
                <Text variant="body1" color="primaryText">
                  {t('hotspot_setup.location_fee.balance')}
                </Text>
                <Box alignItems="flex-end">
                  <Text
                    variant="body1"
                    color={disabled ? 'error' : 'primaryText'}
                  >
                    {assertData?.balances?.hnt?.toString(4)}
                  </Text>
                  <Text
                    variant="body1"
                    color={disabled ? 'error' : 'primaryText'}
                  >
                    {assertData?.balances?.dc?.toString(4)}
                  </Text>
                  {status?.isSolana && (
                    <Text
                      variant="body1"
                      color={
                        assertData?.hasSufficientSol ? 'primaryText' : 'error'
                      }
                    >
                      {assertData?.balances?.sol?.toString(4)}
                    </Text>
                  )}
                </Box>
              </Box>

              <Box
                flexDirection="row"
                justifyContent="space-between"
                marginTop={{ phone: 'm', smallPhone: 'xxs' }}
              >
                <Text variant="body1" color="primaryText">
                  {t('hotspot_setup.location_fee.fee')}
                </Text>
                <Text variant="body1" color="primaryText">
                  {assertData?.ownerFees?.dc
                    ?.toUsd(assertData.oraclePrice)
                    .toString(2)}
                </Text>
                {status?.isSolana && (
                  <Text variant="body1" color="primaryText">
                    {assertData?.ownerFees?.sol?.toString(2)}
                  </Text>
                )}
              </Box>

              {disabled && (
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
      <Box marginHorizontal="lx">
        <DebouncedButton
          title={
            isFree
              ? t('hotspot_setup.location_fee.next')
              : t('hotspot_setup.location_fee.fee_next')
          }
          mode="contained"
          variant="primary"
          onPress={navNext}
          disabled={disabled}
        />
      </Box>
    </BackScreen>
  )
}

export default HotspotSetupConfirmLocationScreen
