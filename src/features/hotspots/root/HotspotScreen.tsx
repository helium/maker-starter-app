import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import animalName from 'angry-purple-tiger'
import { useTranslation } from 'react-i18next'
import { HotspotMeta, useOnboarding } from '@helium/react-native-sdk'
import MapboxGL from '@react-native-mapbox-gl/maps'
import Config from 'react-native-config'
import { ActivityIndicator, Linking } from 'react-native'
import { getHotpotTypes, HotspotStackParamList } from './hotspotTypes'
import Text from '../../../components/Text'
import SafeAreaBox from '../../../components/SafeAreaBox'
import Button from '../../../components/Button'
import { RootNavigationProp } from '../../../navigation/main/tabTypes'
import Box from '../../../components/Box'
import { EXPLORER_BASE_URL } from '../../../utils/config'

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
  const navigation = useNavigation<RootNavigationProp>()
  const [details, setDetails] = useState<HotspotDetails>()
  const [loadingDetails, setLoadingDetails] = useState(true)
  const { getOnboardingRecord, getHotspotDetails } = useOnboarding()

  const needsOnboarding = useMemo(
    () => !loadingDetails && !details,
    [details, loadingDetails],
  )

  const updateHotspotDetails = useCallback(async () => {
    const onboardingRecord = await getOnboardingRecord(hotspot.address)

    /*
         TODO: Determine which network types this hotspot supports
         Could possibly use the maker address
      */
    const hotspotTypes = getHotpotTypes({
      hotspotMakerAddress: onboardingRecord?.maker.address || '',
    })

    let hotspotMeta: HotspotMeta | undefined
    if (hotspotTypes.length) {
      hotspotMeta = await getHotspotDetails({
        address: hotspot.address,
        type: hotspotTypes[0],
      })
    }
    setDetails(hotspotMeta)
    setLoadingDetails(false)
  }, [getHotspotDetails, getOnboardingRecord, hotspot])

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

  const assertHotspot = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    navigation.navigate('HotspotAssert', {
      screen: 'HotspotSetupPickLocationScreen',
      params: { hotspotAddress: hotspot.address },
    })
  }, [hotspot.address, navigation])

  const transferHotspot = useCallback(
    () =>
      navigation.push('TransferHotspot', { hotspotAddress: hotspot.address }),
    [hotspot.address, navigation],
  )

  const explorerUrl = useMemo(() => {
    if (!hotspot) return ''
    const target = 'hotspots'
    return `${EXPLORER_BASE_URL}/${target}/${hotspot.address}`
  }, [hotspot])

  const viewExplorer = () => {
    Linking.openURL(explorerUrl)
  }

  return (
    <SafeAreaBox
      backgroundColor="primaryBackground"
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
        {!details && <ActivityIndicator size="small" color="white" />}
      </Box>

      <Button
        onPress={assertHotspot}
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
        onPress={viewExplorer}
        height={48}
        marginTop="l"
        mode="contained"
        title={t('hotspot_details.options.viewExplorer')}
      />
    </SafeAreaBox>
  )
}

export default memo(HotspotScreen)
