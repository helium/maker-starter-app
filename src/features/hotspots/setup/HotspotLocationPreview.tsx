import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import MapboxGL from '@react-native-mapbox-gl/maps'
import Config from 'react-native-config'
import LocationIcon from '@assets/images/location-icon.svg'
import { StyleSheet } from 'react-native'
import Box from '../../../components/Box'
import Text from '../../../components/Text'
import ActivityIndicator from '../../../components/ActivityIndicator'

type Geocode = {
  shortStreet?: string
  shortState?: string
  shortCountry?: string
  shortCity?: string
  longStreet?: string
  longStat?: string
  longCountry?: string
  longCity?: string
}
type Props = {
  mapCenter?: number[]
  geocode?: Geocode
  locationName?: string
  movable?: boolean
  onMapMoved?: (center?: number[]) => void
  loading?: boolean
}
const HotspotLocationPreview = ({
  mapCenter,
  geocode,
  locationName,
  movable = false,
  onMapMoved = () => {},
  loading,
}: Props) => {
  const map = useRef<MapboxGL.MapView>(null)
  const [coords, setCoords] = useState(mapCenter)

  useEffect(() => {
    if (mapCenter === coords) return
    setCoords(mapCenter)
  }, [coords, mapCenter])

  const onRegionDidChange = useCallback(async () => {
    if (!movable) return
    const center = (await map.current?.getCenter()) as number[]
    setCoords(center)
    onMapMoved(center)
  }, [movable, onMapMoved])

  const hasLocationName = useMemo(
    () => locationName !== undefined || geocode !== undefined,
    [geocode, locationName],
  )

  const LocationName = useCallback(
    () =>
      hasLocationName ? (
        <Box padding="m" backgroundColor="whitePurple">
          <Text
            textAlign="center"
            variant="body1"
            color="surfaceText"
            numberOfLines={1}
            maxFontSizeMultiplier={1.2}
          >
            {locationName ||
              `${geocode?.longStreet}, ${geocode?.shortCity}, ${geocode?.shortCountry}`}
          </Text>
        </Box>
      ) : null,
    [geocode, hasLocationName, locationName],
  )

  return (
    <Box borderRadius="l" overflow="hidden" height="100%">
      <MapboxGL.MapView
        ref={map}
        style={{ height: hasLocationName ? '75%' : '100%' }}
        styleURL={Config.MAPBOX_STYLE_URL}
        logoEnabled={false}
        rotateEnabled={movable}
        pitchEnabled={movable}
        scrollEnabled={movable}
        zoomEnabled={movable}
        compassEnabled={false}
        onRegionDidChange={onRegionDidChange}
      >
        {mapCenter && (
          <MapboxGL.Camera
            defaultSettings={{
              centerCoordinate: mapCenter,
              zoomLevel: 17,
            }}
            maxZoomLevel={17}
          />
        )}

        {coords && (
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          <MapboxGL.PointAnnotation id="locationMarker" coordinate={coords}>
            <LocationIcon color="white" />
          </MapboxGL.PointAnnotation>
        )}
      </MapboxGL.MapView>
      <LocationName />
      {loading && (
        <ActivityIndicator style={StyleSheet.absoluteFill} color="offWhite" />
      )}
    </Box>
  )
}

export default memo(HotspotLocationPreview)
