import React, { useCallback, useMemo } from 'react'
import { ScrollView, Linking } from 'react-native'
import { useTranslation } from 'react-i18next'

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import Toast from 'react-native-simple-toast'
import { useOnboarding } from '@helium/react-native-sdk'

import { EXPLORER_BASE_URL } from '../../../utils/config'
import Text from '../../../components/Text'
import Box from '../../../components/Box'
import {
  SignedInStackParamList,
  SignedInStackNavigationProp,
} from '../../../navigation/navigationRootTypes'
import {
  WithAccountAddress,
  WithAccountAddressProps,
} from '../../../hocs/WithAccountAddress'
import { useGetHostspotsQuery } from '../../../store/helium/heliumApi'
import { DebouncedButton } from '../../../components/Button'
import HotspotLocationPreview from '../../../components/HotspotLocationPreview'
import { checkLocationPermissions } from '../../../utils/permissions'

type Route = RouteProp<SignedInStackParamList, 'HotspotDetails'>

const HotspotDetailsScreen = ({ accountAddress }: WithAccountAddressProps) => {
  const { t } = useTranslation()
  const {
    params: { hotspotAddress },
  } = useRoute<Route>()

  const navigation = useNavigation<SignedInStackNavigationProp>()

  const { data: hotspots } = useGetHostspotsQuery(
    accountAddress,
    { pollingInterval: 60000 }, // refresh every minute
  )

  const hotspot = useMemo(() => {
    return hotspots?.find(({ address }) => address === hotspotAddress)
  }, [hotspots, hotspotAddress])

  const { getOnboardingRecord } = useOnboarding()

  const changeLocation = useCallback(async () => {
    const onboardingRecord = await getOnboardingRecord(hotspotAddress)
    if (!onboardingRecord) return

    const isGranted = await checkLocationPermissions()
    if (!isGranted) return

    navigation.navigate('HotspotOnboarding', {
      screen: 'PickLocationScreen',
      params: {
        hotspotAddress,
        onboardingRecord,
      },
    })
  }, [getOnboardingRecord, hotspotAddress, navigation])

  const viewOnHeliumExplorer = useCallback(async () => {
    if (!hotspotAddress) return

    const url = `${EXPLORER_BASE_URL}/hotspots/${hotspotAddress}`

    const supported = await Linking.canOpenURL(url)
    if (supported) {
      await Linking.openURL(url)
    } else {
      Toast.showWithGravity(
        t('generic.openLinkError', { url }),
        Toast.LONG,
        Toast.CENTER,
      )
    }
  }, [t, hotspotAddress])

  return (
    <Box
      flex={1}
      backgroundColor="primaryBackground"
      paddingHorizontal="m"
      paddingBottom="m"
    >
      {!hotspot ? (
        <Text variant="body1" textAlign="center">
          {t('hotspotDetailsScreen.noData')}
        </Text>
      ) : (
        <>
          <Text
            variant="h2"
            textTransform="capitalize"
            marginBottom="xs"
            adjustsFontSizeToFit
            numberOfLines={1}
          >
            {hotspot.name}
          </Text>

          <Text
            variant="body1"
            color="linkText"
            textDecorationLine="underline"
            onPress={viewOnHeliumExplorer}
          >
            {t('hotspotDetailsScreen.viewOnHeliumExplorer')}
          </Text>

          <ScrollView>
            <Box flex={1} marginTop="l">
              <Box
                flexDirection="row"
                justifyContent="space-between"
                marginBottom="l"
              >
                <Text variant="body1" fontWeight="bold">
                  {t('hotspotDetailsScreen.statusLabel')}
                </Text>

                <Text
                  variant="body1"
                  fontWeight="bold"
                  textTransform="capitalize"
                >
                  {hotspot.status}
                </Text>
              </Box>

              {hotspot.isLocationSet ? (
                <Box height={200}>
                  <HotspotLocationPreview geocode={hotspot.geocode} />
                </Box>
              ) : (
                <Box flexDirection="row" justifyContent="space-between">
                  <Text variant="body1" fontWeight="bold">
                    {t('hotspotDetailsScreen.locationLabel')}
                  </Text>

                  <Text variant="body1" fontWeight="bold">
                    {t('hotspotDetailsScreen.locationNotSet')}
                  </Text>
                </Box>
              )}

              {hotspot.isLocationSet && (
                <>
                  <Box
                    flexDirection="row"
                    justifyContent="space-between"
                    marginTop="l"
                  >
                    <Text variant="body1" fontWeight="bold">
                      {t('hotspot_setup.location_fee.gain_label')}
                    </Text>

                    <Text variant="body1" fontWeight="bold">
                      {t('hotspot_setup.location_fee.gain', {
                        gain: hotspot.gain,
                      })}
                    </Text>
                  </Box>

                  <Box
                    flexDirection="row"
                    justifyContent="space-between"
                    marginTop="l"
                  >
                    <Text variant="body1" fontWeight="bold">
                      {t('hotspot_setup.location_fee.elevation_label')}
                    </Text>

                    <Text variant="body1" fontWeight="bold">
                      {t('hotspot_setup.location_fee.elevation', {
                        count: hotspot.elevation,
                      })}
                    </Text>
                  </Box>
                </>
              )}
            </Box>
          </ScrollView>

          <Box>
            <DebouncedButton
              onPress={changeLocation}
              color="primary"
              fullWidth
              marginBottom="m"
              title={t(
                `hotspotDetailsScreen.${
                  hotspot.isLocationSet ? 'changeLocationBtn' : 'setLocationBtn'
                }`,
              )}
            />
          </Box>
        </>
      )}
    </Box>
  )
}

export default WithAccountAddress(HotspotDetailsScreen)
