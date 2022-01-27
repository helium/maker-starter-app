import React, { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Linking, StyleSheet } from 'react-native'
import { RouteProp, useRoute } from '@react-navigation/native'
import Toast from 'react-native-simple-toast'

import { EXPLORER_BASE_URL } from '../../../utils/config'
import Text from '../../../components/Text'
import Box from '../../../components/Box'
import { SignedInStackParamList } from '../../../navigation/navigationRootTypes'
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

  const { data: hotspots } = useGetHostspotsQuery(
    accountAddress,
    { pollingInterval: 60000 }, // refresh every minute
  )

  const hotspot = useMemo(() => {
    return hotspots?.find(({ address }) => address === hotspotAddress)
  }, [hotspots, hotspotAddress])

  const openHotspotInExplorer = useCallback(async () => {
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

          <Text variant="h4" style={styles.status}>
            {hotspot.status}
          </Text>

          {hotspot.locationName ? (
            <Box height={200} marginBottom="s">
              <HotspotLocationPreview geocode={hotspot.geocode} />
            </Box>
          ) : (
            <Text variant="body1" marginBottom="xs">
              {t('hotspotsScreen.locationNotSet')}
            </Text>
          )}

          {/* <Button
            onPress={}
            color="primary"
            fullWidth
            marginBottom="m"
            title={t(`hotspotDetailsScreen.${hotspot.locationName ? 'changeLocationBtn' : 'setLocationBtn'}`)}
          /> */}

          <Button
            onPress={openHotspotInExplorer}
            color="primary"
            fullWidth
            marginBottom="m"
            title={t('hotspotDetailsScreen.openInExplorerBtn')}
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
