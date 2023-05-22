import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { useTranslation } from 'react-i18next'
import { Position } from 'geojson'
import Search from '@assets/images/search.svg'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet'
import Box from '../../../components/Box'
import Button, { DebouncedButton } from '../../../components/Button'
import Map from '../../../components/Map'
import Text from '../../../components/Text'
import { reverseGeocode } from '../../../utils/location'
import sleep from '../../../utils/sleep'
import {
  HotspotSetupNavigationProp,
  HotspotSetupStackParamList,
} from './hotspotSetupTypes'
import TouchableOpacityBox from '../../../components/TouchableOpacityBox'
import { useColors, useSpacing } from '../../../theme/themeHooks'
import BSHandle from '../../../components/BSHandle'
import AddressSearchModal from './AddressSearchModal'
import { PlaceGeography } from '../../../utils/googlePlaces'
import useGetLocation from '../../../utils/useGetLocation'
import useSolanaCache from '../../../utils/solanaCache'

type Route = RouteProp<
  HotspotSetupStackParamList,
  'HotspotSetupPickLocationScreen'
>
const HotspotSetupPickLocationScreen = () => {
  const { t } = useTranslation()
  const { params } = useRoute<Route>()
  const navigation = useNavigation<HotspotSetupNavigationProp>()
  const [disabled, setDisabled] = useState(true)
  const [mapCenter, setMapCenter] = useState([-122.419, 37.775])
  const [markerCenter, setMarkerCenter] = useState([-122.419, 37.775])
  const [hasGPSLocation, setHasGPSLocation] = useState(false)
  const [locationName, setLocationName] = useState('')
  const spacing = useSpacing()
  const insets = useSafeAreaInsets()
  const searchModal = useRef<BottomSheetModal>(null)
  const { surface } = useColors()
  const maybeGetLocation = useGetLocation()
  const { getCachedHotspotDetails: getHotspotDetails } = useSolanaCache()

  useEffect(() => {
    const checkLocationPermissions = () => {
      maybeGetLocation(true)
    }

    const sleepThenEnable = async () => {
      await sleep(2000)
      setDisabled(false)
    }

    checkLocationPermissions()
    sleepThenEnable()
  }, [maybeGetLocation, params])

  const onMapMoved = useCallback(async (newCoords?: Position) => {
    if (newCoords) {
      setMarkerCenter(newCoords)

      const [longitude, latitude] = newCoords
      const [{ street, city }] = await reverseGeocode(latitude, longitude)
      // for some locations street is null when good reverse geocode is not available
      // shouldn't effect much as cords are still part of transaction
      const name = city
        ? [street || 'unknown street', city].join(', ')
        : 'Address Loading...'
      setLocationName(name)
    }
  }, [])

  const navNext = useCallback(() => {
    navigation.navigate('AntennaSetupScreen', {
      ...params,
      coords: markerCenter,
      locationName,
    })
  }, [locationName, markerCenter, navigation, params])

  const onDidFinishLoadingMap = useCallback(
    async (latitude: number, longitude: number) => {
      let hotspot
      try {
        hotspot = await getHotspotDetails(params.hotspotAddress)
      } catch (error) {
        if (error?.status === 404) {
          // Silencing the 404 error since it means the hotspot is not on chain and
          // it is needed to move forward to onboarding.
        } else {
          throw error
        }
      }

      const defaultLocation =
        hotspot?.lng && hotspot?.lat
          ? [hotspot?.lng, hotspot?.lat]
          : [longitude, latitude]
      setHasGPSLocation(true)
      setMapCenter(defaultLocation)
    },
    [params, getHotspotDetails],
  )

  const handleSearchPress = useCallback(() => {
    searchModal.current?.present()
  }, [])

  const handleSelectPlace = useCallback((placeGeography: PlaceGeography) => {
    setMapCenter([placeGeography.lng, placeGeography.lat])
    searchModal.current?.dismiss()
  }, [])

  const searchSnapPoints = useMemo(() => ['85%'], [])

  return (
    <Box flex={1} backgroundColor="primaryBackground">
      <TouchableOpacityBox
        onPress={handleSearchPress}
        position="absolute"
        padding="m"
        top={insets.top + spacing.s}
        right={spacing.m}
        zIndex={1}
      >
        <Search width={30} height={30} color="white" />
      </TouchableOpacityBox>
      <Box flex={1.2}>
        <Map
          maxZoomLevel={17}
          mapCenter={mapCenter}
          onMapMoved={onMapMoved}
          onDidFinishLoadingMap={onDidFinishLoadingMap}
          markerLocation={markerCenter}
          currentLocationEnabled
        />
      </Box>
      <Box backgroundColor="primaryBackground" padding="l">
        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          marginBottom="lm"
        >
          <Box>
            <Text variant="body1" marginBottom="xs">
              {t('hotspot_setup.location.title')}
            </Text>
            <Text variant="body1">{locationName}</Text>
          </Box>
        </Box>
        <DebouncedButton
          onPress={navNext}
          variant="primary"
          mode="contained"
          disabled={disabled || !hasGPSLocation}
          title={t('hotspot_setup.location.next')}
        />
        <Button title={t('generic.cancel')} onPress={navigation.goBack} />
      </Box>
      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={searchModal}
          snapPoints={searchSnapPoints}
          handleComponent={BSHandle}
          backdropComponent={BottomSheetBackdrop}
          backgroundStyle={{ backgroundColor: surface }}
        >
          <AddressSearchModal onSelectPlace={handleSelectPlace} />
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </Box>
  )
}

export default memo(HotspotSetupPickLocationScreen)
