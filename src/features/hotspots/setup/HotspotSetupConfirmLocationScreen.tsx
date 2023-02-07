import React, { useCallback, useMemo, useState } from 'react'
import { ScrollView } from 'react-native'
import { useTranslation } from 'react-i18next'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { useOnboarding, AssertData } from '@helium/react-native-sdk'
import { useAsync } from 'react-async-hook'
import Config from 'react-native-config'
import { first, last } from 'lodash'
import animalName from 'angry-purple-tiger'
import { HotspotType } from '@helium/onboarding'
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

type Route = RouteProp<
  HotspotSetupStackParamList,
  'HotspotSetupConfirmLocationScreen'
>

const HotspotSetupConfirmLocationScreen = () => {
  const { t } = useTranslation()
  const navigation = useNavigation<HotspotSetupNavigationProp>()
  const rootNav = useNavigation<RootNavigationProp>()
  const [assertData, setAssertData] = useState<AssertData>()
  const [assertLocationTxn, setAssertLocationTxn] = useState<string>()
  const [addGatewayTxn, setAddGatewayTxn] = useState<string>()
  const [solanaTransactions, setSolanaTransactions] = useState<string[]>()
  const { params } = useRoute<Route>()
  const { getAssertData, getOnboardingRecord, getOnboardTransactions } =
    useOnboarding()

  useAsync(async () => {
    const { elevation, gain, coords } = params

    const userAddress = await getAddress()

    const lat = last(coords)
    const lng = first(coords)

    if (!lat || !lng || !userAddress) return

    try {
      let hotspotTypes = [] as HotspotType[]
      const onboardingRecord = await getOnboardingRecord(params.hotspotAddress)
      /*
         TODO: Determine which network types this hotspot supports
         Could possibly use the maker address
      */
      if (Config.MAKER_ADDRESS_5G === onboardingRecord?.maker.address) {
        hotspotTypes = ['iot', 'mobile']
      } else {
        hotspotTypes = ['iot']
      }

      const isAddingGateway = !!params.addGatewayTxn

      if (isAddingGateway) {
        const onboardData = await getOnboardTransactions({
          txn: params.addGatewayTxn,
          hotspotAddress: params.hotspotAddress,
          hotspotTypes,
          elevation,
          decimalGain: gain,
          lat,
          lng,
        })

        setAddGatewayTxn(onboardData.addGatewayTxn)
        setSolanaTransactions(onboardData.solanaTransactions)
      } else {
        const data = await getAssertData({
          decimalGain: gain,
          elevation,
          gateway: params.hotspotAddress,
          lat,
          lng,
          owner: userAddress,
          onboardingRecord,
          hotspotTypes,
        })

        setAssertData(data)
        setAssertLocationTxn(data.assertLocationTxn)
        setSolanaTransactions(data.solanaTransactions)
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
    }
  }, [getAssertData, params])

  const isFree = useMemo(() => {
    if (!assertData) {
      return true
    }
    return assertData.isFree
  }, [assertData])

  const navNext = useCallback(async () => {
    navigation.replace('HotspotTxnsProgressScreen', {
      addGatewayTxn: addGatewayTxn || '',
      assertLocationTxn: assertLocationTxn || '',
      solanaTransactions: solanaTransactions || [],
      hotspotAddress: params.hotspotAddress,
    })
  }, [assertLocationTxn, addGatewayTxn, navigation, params, solanaTransactions])

  const handleClose = useCallback(() => rootNav.navigate('MainTabs'), [rootNav])

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

          <Box
            flexDirection="row"
            justifyContent="space-between"
            marginTop={{ phone: 'm', smallPhone: 'xxs' }}
          >
            <Text variant="body1" color="secondaryText">
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
            <Text variant="body1" color="secondaryText">
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
                <Text variant="body1" color="secondaryText">
                  {t('hotspot_setup.location_fee.balance')}
                </Text>
                <Text
                  variant="body1"
                  color={
                    assertData?.hasSufficientBalance ? 'secondaryText' : 'error'
                  }
                >
                  {`${assertData?.balances?.hnt?.toString(
                    4,
                  )} - ${assertData?.balances?.sol?.toString(4)}`}
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
                  {assertData?.ownerFees?.dc
                    ?.toUsd(assertData.oraclePrice)
                    .toString(2)}
                </Text>
                <Text variant="body1" color="primaryText">
                  {assertData?.ownerFees?.sol?.toString(2)}
                </Text>
              </Box>

              {!assertData?.hasSufficientBalance && (
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
          disabled={isFree ? false : !assertData?.hasSufficientBalance}
        />
      </Box>
    </BackScreen>
  )
}

export default HotspotSetupConfirmLocationScreen
