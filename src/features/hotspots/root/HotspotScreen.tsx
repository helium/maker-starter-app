import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import animalName from 'angry-purple-tiger'
import { useTranslation } from 'react-i18next'
import { HotspotMeta } from '@helium/react-native-sdk'
import MapboxGL from '@react-native-mapbox-gl/maps'
import Config from 'react-native-config'
import { ActivityIndicator, Linking, ScrollView } from 'react-native'
import { getHotspotTypes, HotspotStackParamList } from './hotspotTypes'
import Text from '../../../components/Text'
import SafeAreaBox from '../../../components/SafeAreaBox'
import Button from '../../../components/Button'
import { RootNavigationProp } from '../../../navigation/main/tabTypes'
import Box from '../../../components/Box'
import { EXPLORER_BASE_URL } from '../../../utils/config'
import { useColors } from '../../../theme/themeHooks'
import useSolanaCache from '../../../utils/solanaCache'

type Route = RouteProp<HotspotStackParamList, 'HotspotScreen'>
type HotspotDetails = {
  lat?: number
  lng?: number
  location?: string
  elevation?: number
  gain?: number
}
const HotspotScreen = () => {
  const {
    params: { hotspot },
  } = useRoute<Route>()
  const { t } = useTranslation()
  const { primaryText } = useColors()
  const navigation = useNavigation<RootNavigationProp>()
  const [details, setDetails] = useState<HotspotDetails>()
  const [loadingDetails, setLoadingDetails] = useState(true)
  const { getCachedHotspotDetails: getHotspotDetails } = useSolanaCache()

  const needsOnboarding = useMemo(
    () => !loadingDetails && !details,
    [details, loadingDetails],
  )

  const updateHotspotDetails = useCallback(async () => {
    const hotspotTypes = getHotspotTypes()

    let hotspotMeta: HotspotMeta | undefined
    if (hotspotTypes.length) {
      hotspotMeta = await getHotspotDetails({
        address: hotspot.address,
        type: hotspotTypes[0],
      })
    }
    setDetails(hotspotMeta)
    setLoadingDetails(false)
  }, [getHotspotDetails, hotspot])

  useEffect(() => {
    return navigation.addListener('focus', () => {
      updateHotspotDetails()
    })
  }, [navigation, updateHotspotDetails])

  const formattedHotspotName = useMemo(() => {
    if (!hotspot || !hotspot.address) return ''

    const name = animalName(hotspot.address)
    const pieces = name.split(' ')
    if (pieces.length < 3) return name

    return [`${pieces[0]} ${pieces[1]}`, pieces[2]]
  }, [hotspot])

  const updateWifi = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    navigation.navigate('HotspotSetup', {
      screen: 'HotspotSetupScanningScreen',
      params: { hotspotType: 'IOT', gatewayAction: 'setupWifi' },
    })
  }, [navigation])

  const assertHotspot = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    navigation.navigate('HotspotAssert', {
      screen: 'HotspotSetupPickLocationScreen',
      params: { hotspotAddress: hotspot.address },
    })
  }, [hotspot.address, navigation])

  const updateAntenna = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    navigation.navigate('HotspotAssert', {
      screen: 'AntennaSetupScreen',
      params: { hotspotAddress: hotspot.address, updateAntennaOnly: true },
    })
  }, [hotspot.address, navigation])

  const transferHotspot = useCallback(
    () =>
      navigation.push('TransferHotspot', { hotspotAddress: hotspot.address }),
    [hotspot.address, navigation],
  )

  // the hotspots are only available at hotspoty now, the explorer.helium.com only
  // offers link to hotspoty, it is better to directly go there.
  const explorerUrl = useMemo(() => {
    if (!hotspot) return ''
    const target = 'hotspots'
    return `${EXPLORER_BASE_URL}/${target}/${hotspot.address}/rewards`
  }, [hotspot])

  const antennaDetails = useMemo(() => {
    if (!hotspot) return ''
    const gain = details?.gain ? details.gain / 10 : 0.0
    const elevation = details?.elevation ? details.elevation : 0.0
    return (
      `${t('antennas.gain_info.title')}: ${gain} dBi\n` +
      `${t('antennas.elevation_info.title')}: ${elevation} meters`
    )
  }, [details, hotspot, t])

  const viewExplorer = () => {
    Linking.openURL(explorerUrl)
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <SafeAreaBox
        backgroundColor="primaryBackground"
        padding="m"
        flex={1}
        paddingHorizontal="l"
        justifyContent="center"
      >
        <Text
          fontSize={29}
          lineHeight={31}
          color="primaryText"
          fontWeight="200"
          numberOfLines={1}
          width="100%"
          adjustsFontSizeToFit
        >
          {formattedHotspotName[0]}
        </Text>
        <Text
          variant="body1"
          fontSize={29}
          lineHeight={31}
          paddingRight="s"
          color="primaryText"
          numberOfLines={1}
          adjustsFontSizeToFit
          marginBottom="l"
        >
          {formattedHotspotName[1]}
        </Text>
        {needsOnboarding && (
          <Text color="primaryText" variant="body1">
            {t('hotspots.notOnboarded')}
          </Text>
        )}
        {details && (
          <Text color="primaryText" variant="body1">
            {antennaDetails}
          </Text>
        )}

        <Box
          height={210}
          width="100%"
          borderRadius="xl"
          overflow="hidden"
          marginTop="s"
          marginBottom="xxs"
        >
          {details?.lat && details.lng && (
            <Box height={200} width="100%" borderRadius="xl" overflow="hidden">
              <MapboxGL.MapView
                styleURL={Config.MAPBOX_STYLE_URL}
                style={{ height: 200, width: '100%' }}
              >
                <MapboxGL.Camera
                  defaultSettings={{
                    centerCoordinate: [details.lng, details.lat],
                    zoomLevel: 9,
                  }}
                />
              </MapboxGL.MapView>
              <Box
                position="absolute"
                top={0}
                bottom={0}
                left={0}
                right={0}
                alignItems="center"
                justifyContent="center"
                pointerEvents="none"
              >
                <Box
                  height={16}
                  borderRadius="round"
                  width={16}
                  backgroundColor="peacockGreen"
                  pointerEvents="none"
                />
              </Box>
            </Box>
          )}
          {!details && <ActivityIndicator size="small" color={primaryText} />}
        </Box>
        <Button
          onPress={assertHotspot}
          disabled={needsOnboarding}
          height={48}
          marginTop="l"
          mode="contained"
          title={t('hotspots.empty.hotspots.assertLocation')}
        />
        <Button
          onPress={transferHotspot}
          height={48}
          marginTop="l"
          mode="contained"
          title={t('hotspots.empty.hotspots.transfer')}
        />
        <Button
          onPress={updateWifi}
          height={48}
          marginTop="l"
          mode="contained"
          title={t('hotspots.empty.hotspots.updateWifi')}
        />
        <Button
          onPress={updateAntenna}
          height={48}
          marginTop="l"
          mode="contained"
          title={t('hotspot_details.options.update_antenna')}
        />
        <Button
          onPress={viewExplorer}
          height={48}
          marginTop="l"
          mode="contained"
          title={t('hotspot_details.options.viewExplorer')}
        />
      </SafeAreaBox>
    </ScrollView>
  )
}

export default memo(HotspotScreen)
