import React, { useCallback, useMemo, useState } from 'react'
import { ActivityIndicator, ScrollView } from 'react-native'
import { useTranslation } from 'react-i18next'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { useOnboarding, AssertData } from '@helium/react-native-sdk'
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
import { getHotspotTypes } from '../root/hotspotTypes'
import useSolanaCache from '../../../utils/solanaCache'

type Route = RouteProp<
  HotspotSetupStackParamList,
  'HotspotSetupConfirmLocationScreen'
>

const HotspotSetupConfirmLocationScreen = () => {
  const { t } = useTranslation()
  const navigation = useNavigation<HotspotSetupNavigationProp>()
  const rootNav = useNavigation<RootNavigationProp>()
  const [assertData, setAssertData] = useState<AssertData>()
  const [isFree, setIsFree] = useState<boolean>()
  const [solanaTransactions, setSolanaTransactions] = useState<string[]>()
  const { params } = useRoute<Route>()
  const { getAssertData, getOnboardingRecord, getOnboardTransactions } =
    useOnboarding()
  const { getCachedHotspotDetails: getHotspotDetails } = useSolanaCache()

  useAsync(async () => {
    console.log('lets get onboarding rcord.')
    const { elevation, gain, coords, updateAntennaOnly } = params

    const userAddress = await getAddress()

    const lat = last(coords)
    const lng = first(coords)

    if (!userAddress) return
    console.log('user address: ', userAddress)
    if (!updateAntennaOnly && (!lat || !lng)) return
    console.log('antenna only update or location assert')

    try {
      const onboardingRecord = await getOnboardingRecord(params.hotspotAddress)
      const hotspotTypes = getHotspotTypes()

      const locationParams = {
        decimalGain: gain,
        elevation,
        lat,
        lng,
      }
      if (params.addGatewayTxn) {
        setIsFree(true)
        console.log('onboarding is free')
      } else {
        const hotspotDetails = await getHotspotDetails({
          address: params.hotspotAddress,
          type: hotspotTypes[0],
        })
        const hotspotExists = !!hotspotDetails

        if (hotspotExists) {
          console.log('exising hotspot, get assert data')
          if (updateAntennaOnly) {
            locationParams.lat = hotspotDetails?.lat
            locationParams.lng = hotspotDetails?.lng
          }

          const assert = await getAssertData({
            ...locationParams,
            gateway: params.hotspotAddress,
            owner: userAddress,
            onboardingRecord,
            hotspotTypes,
          })

          console.log('assert: ', assert)

          setAssertData(assert)
          setSolanaTransactions(assert.solanaTransactions)
          setIsFree(assert.isFree)
        } else {
          // Edge  case - hotspot hasn't been onboarded yet
          const onboard = await getOnboardTransactions({
            hotspotAddress: params.hotspotAddress,
            hotspotTypes,
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
      solanaTransactions: solanaTransactions || [],
      hotspotAddress: params.hotspotAddress,
      coords: params.coords,
      elevation: params.elevation,
      gain: params.gain,
    })
  }, [navigation, params, solanaTransactions])

  const handleClose = useCallback(() => rootNav.navigate('MainTabs'), [rootNav])

  if (isFree === undefined) {
    return (
      <Box flex={1} alignItems="center" justifyContent="center">
        <ActivityIndicator color="primaryText" />
      </Box>
    )
  }

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
              <Text
                variant="body1"
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
                marginTop={{ phone: 'm', smallPhone: 'xxs' }}
              >
                <Text variant="body1" color="primaryText">
                  {t('hotspot_setup.location_fee.balance')}
                </Text>
                <Box>
                  <Text
                    variant="body1"
                    color={disabled ? 'error' : 'secondaryText'}
                  >
                    {assertData?.balances?.hnt?.toString(4)}
                  </Text>
                  <Text
                    variant="body1"
                    color={disabled ? 'error' : 'secondaryText'}
                  >
                    {assertData?.balances?.dc?.toString(4)}
                  </Text>
                  <Text
                    variant="body1"
                    color={
                      assertData?.hasSufficientSol ? 'secondaryText' : 'error'
                    }
                  >
                    {assertData?.balances?.sol?.toString(4)}
                  </Text>
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
                {/* {params.updateAntennaOnly ? (
                  <Text variant="body1" color="primaryText">
                    55,000 DC ($0.55)
                  </Text>
                ) : ( */}
                <Text variant="body1" color="primaryText">
                  {assertData?.ownerFees?.dc
                    ?.toUsd(assertData.oraclePrice)
                    .toString(2)}
                </Text>
                {/* )} */}
                <Text variant="body1" color="primaryText">
                  {assertData?.ownerFees?.sol?.toString(2)}
                </Text>
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
      <Box>
        {params.updateAntennaOnly ? (
          <DebouncedButton
            title={t('hotspot_setup.antenna_only_fee.fee_antenna')}
            mode="contained"
            variant="primary"
            onPress={navNext}
            disabled={isFree ? false : disabled}
          />
        ) : (
          <DebouncedButton
            title={
              isFree
                ? t('hotspot_setup.location_fee.next')
                : t('hotspot_setup.location_fee.fee_next')
            }
            mode="contained"
            variant="secondary"
            onPress={navNext}
            disabled={disabled}
          />
        )}
      </Box>
    </BackScreen>
  )
}

export default HotspotSetupConfirmLocationScreen
