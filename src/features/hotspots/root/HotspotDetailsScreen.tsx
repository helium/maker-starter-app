import React, { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Linking, StyleSheet } from 'react-native'
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
import { Button } from '../../../components/Button'
import HotspotLocationPreview from '../../../components/HotspotLocationPreview'

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
            variant="h1"
            style={styles.name}
            marginBottom="xs"
            adjustsFontSizeToFit
            numberOfLines={1}
          >
            {hotspot.name}
          </Text>
          <Text variant="body1" color="linkText" onPress={viewOnHeliumExplorer}>
            {t('hotspotDetailsScreen.viewOnHeliumExplorer')}
          </Text>

          <Text variant="h3" marginTop="l" marginBottom="l">
            {t('hotspotDetailsScreen.statusLabel')}
            <Text style={styles.status}>{hotspot.status}</Text>
          </Text>

          {hotspot.locationName ? (
            <>
              <Text variant="h3">
                {t('hotspotDetailsScreen.locationLabel')}
              </Text>
              <Box height={200} marginBottom="s">
                <HotspotLocationPreview geocode={hotspot.geocode} />
              </Box>
            </>
          ) : (
            <Text variant="h3">{t('hotspotDetailsScreen.locationNotSet')}</Text>
          )}

          <Button
            onPress={changeLocation}
            color="primary"
            fullWidth
            marginBottom="m"
            title={t(
              `hotspotDetailsScreen.${
                hotspot.locationName ? 'changeLocationBtn' : 'setLocationBtn'
              }`,
            )}
          />
        </>
      )}
    </Box>
  )
}

const styles = StyleSheet.create({
  name: {
    textTransform: 'capitalize',
  },
  status: {
    textTransform: 'uppercase',
  },
})

export default WithAccountAddress(HotspotDetailsScreen)
