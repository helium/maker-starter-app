import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";

import { Hotspot, Witness } from "@helium/http";
import MapboxGL, {
  FillLayerStyle,
  LineLayerStyle,
  RegionPayload,
  SymbolLayerStyle,
} from "@react-native-mapbox-gl/maps";
import { BoxProps } from "@shopify/restyle";
import { Feature, Point, Position } from "geojson";
import { h3ToGeo } from "h3-js";
import { isFinite } from "lodash";
import { useTranslation } from "react-i18next";
import { StyleProp, ViewStyle } from "react-native";
import { Config } from "react-native-config";

import LocationIcon from "assets/images/location-icon.svg";
import NoLocation from "assets/images/no-location.svg";
import { theme, Theme } from "theme/theme";
import { useColors } from "theme/themeHooks";
import { distance } from "utils/location";
import { findBounds } from "utils/mapUtils";

import Box from "./Box";
import CurrentLocationButton from "./CurrentLocationButton";
import Text from "./Text";

const defaultLngLat = [-122.419418, 37.774929]; // San Francisco

type Props = BoxProps<Theme> & {
  onMapMoved?: (coords?: Position) => void;
  onDidFinishLoadingMap?: (latitude: number, longitude: number) => void;
  onMapMoving?: (feature: Feature<Point, RegionPayload>) => void;
  cameraBottomOffset?: number;
  currentLocationEnabled?: boolean;
  zoomLevel?: number;
  mapCenter?: number[];
  selectedHotspot?: Hotspot | Witness;
  witnesses?: Witness[];
  animationMode?: "flyTo" | "easeTo" | "moveTo";
  animationDuration?: number;
  maxZoomLevel?: number;
  minZoomLevel?: number;
  interactive?: boolean;
  showUserLocation?: boolean;
  showNoLocation?: boolean;
  markerLocation?: number[];
};
const Map = ({
  onMapMoved,
  onDidFinishLoadingMap,
  onMapMoving,
  currentLocationEnabled,
  zoomLevel,
  mapCenter,
  animationMode = "moveTo",
  animationDuration = 500,
  selectedHotspot,
  witnesses = [],
  showUserLocation,
  maxZoomLevel = 16,
  minZoomLevel = 0,
  interactive = true,
  showNoLocation,
  cameraBottomOffset,
  markerLocation,
  ...props
}: Props) => {
  const colors = useColors();
  const { t } = useTranslation();
  const map = useRef<MapboxGL.MapView>(null);
  const camera = useRef<MapboxGL.Camera>(null);
  const [loaded, setLoaded] = useState(false);
  const [userCoords, setUserCoords] = useState({ latitude: 0, longitude: 0 });
  const styles = useMemo(() => makeStyles(colors), [colors]);

  const onRegionDidChange = useCallback(async () => {
    if (onMapMoved) {
      const center = await map.current?.getCenter();
      onMapMoved(center);
    }
  }, [onMapMoved]);

  const centerUserLocation = useCallback(() => {
    const hasCoords = userCoords && isFinite(userCoords.longitude) && isFinite(userCoords.latitude);
    camera.current?.setCamera({
      centerCoordinate: hasCoords ? [userCoords.longitude, userCoords.latitude] : defaultLngLat,
      zoomLevel: hasCoords ? 16 : 2,
      animationDuration,
      heading: 0,
    });
  }, [animationDuration, userCoords]);

  const handleUserLocationUpdate = useCallback(
    (loc: MapboxGL.Location) => {
      if (!loc?.coords || (userCoords.latitude && userCoords.longitude)) {
        return;
      }

      setUserCoords(loc.coords);
    },
    [userCoords],
  );

  useEffect(() => {
    if (!showUserLocation || !isFinite(userCoords.latitude) || !isFinite(userCoords.longitude)) {
      return;
    }

    camera.current?.setCamera({
      centerCoordinate: [userCoords.longitude, userCoords.latitude],
      zoomLevel,
    });
  }, [showUserLocation, userCoords, zoomLevel]);

  const onDidFinishLoad = useCallback(() => {
    setLoaded(true);
  }, []);

  const selectedHex = useMemo(() => selectedHotspot?.locationHex, [selectedHotspot?.locationHex]);

  useEffect(() => {
    if (loaded && userCoords) {
      onDidFinishLoadingMap?.(userCoords.latitude, userCoords.longitude);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userCoords, loaded]);

  const mapImages = useMemo(
    () => ({
      markerLocation: require("assets/images/selectedLocation.png"),
    }),
    [],
  );

  const bounds = useMemo(() => {
    const boundsLocations: number[][] = [];
    let hotspotCoords: number[] | undefined;

    if (mapCenter && !selectedHotspot && !selectedHex) {
      boundsLocations.push(mapCenter);
    }

    if (selectedHotspot && selectedHotspot.locationHex) {
      const h3Location = selectedHotspot.locationHex;
      hotspotCoords = h3ToGeo(h3Location).reverse();
      boundsLocations.push(hotspotCoords);
    }

    if (selectedHex && !selectedHotspot) {
      boundsLocations.push(h3ToGeo(selectedHex).reverse());
    }

    if (hotspotCoords) {
      const hotspotLatLng = {
        latitude: hotspotCoords[1],
        longitude: hotspotCoords[0],
      };
      witnesses.forEach((w) => {
        if (w.locationHex) {
          const h3Location = w.locationHex;
          const coords = h3ToGeo(h3Location).reverse();
          const distanceKM = distance({ latitude: coords[1], longitude: coords[0] }, hotspotLatLng);
          if (distanceKM < 200) {
            boundsLocations.push(coords);
          }
        }
      });
    }

    return findBounds(boundsLocations, cameraBottomOffset);
  }, [mapCenter, cameraBottomOffset, selectedHex, selectedHotspot, witnesses]);

  const defaultCameraSettings = useMemo(() => {
    const centerCoordinate =
      mapCenter?.length === 2 && isFinite(mapCenter[0]) && isFinite(mapCenter[1])
        ? mapCenter
        : defaultLngLat;
    return {
      zoomLevel,
      centerCoordinate,
    };
  }, [mapCenter, zoomLevel]);

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Box {...props}>
      {showNoLocation && (
        <Box
          position="absolute"
          zIndex={100}
          top={0}
          left={0}
          right={0}
          bottom={250}
          justifyContent="center"
          alignItems="center"
        >
          <NoLocation color={colors.primary} />
          <Text variant="h2" marginTop="m">
            {t("mapComponent.noLocationTitle")}
          </Text>
          <Text variant="body2" marginTop="s">
            {t("mapComponent.noLocationBody")}
          </Text>
        </Box>
      )}
      <MapboxGL.MapView
        ref={map}
        onRegionDidChange={onRegionDidChange}
        onRegionWillChange={onMapMoving}
        onDidFinishLoadingMap={onDidFinishLoad}
        styleURL={Config.MAPBOX_STYLE_URL}
        style={styles.map}
        logoEnabled={false}
        rotateEnabled={false}
        pitchEnabled={false}
        scrollEnabled={interactive}
        zoomEnabled={interactive}
        compassEnabled={false}
      >
        {(showUserLocation || currentLocationEnabled) && (
          <MapboxGL.UserLocation onUpdate={handleUserLocationUpdate}>
            <MapboxGL.SymbolLayer id="markerLocation" style={styles.markerLocation} />
          </MapboxGL.UserLocation>
        )}
        <MapboxGL.Camera
          ref={camera}
          maxZoomLevel={maxZoomLevel}
          minZoomLevel={minZoomLevel}
          defaultSettings={defaultCameraSettings}
          bounds={bounds}
          animationMode={animationMode}
          animationDuration={animationDuration}
        />
        <MapboxGL.Images images={mapImages} />
        {markerLocation !== undefined && (
          <MapboxGL.PointAnnotation id="locationCenterMarker" coordinate={markerLocation}>
            <LocationIcon color={colors.primaryText} />
          </MapboxGL.PointAnnotation>
        )}
      </MapboxGL.MapView>
      {currentLocationEnabled && <CurrentLocationButton onPress={centerUserLocation} />}
    </Box>
  );
};

const makeStyles = (colors: typeof theme.colors) => ({
  map: {
    width: "100%",
    height: "100%",
    borderRadius: 40,
  } as StyleProp<ViewStyle>,
  markerLocation: {
    iconImage: "markerLocation",
    iconOffset: [0, -25 / 2],
  } as StyleProp<SymbolLayerStyle>,
  selectedHexagon: {
    lineWidth: 2,
    lineColor: colors.white,
  } as StyleProp<LineLayerStyle>,
  ownedFill: {
    fillOpacity: 0.4,
    fillColor: colors.secondary,
    fillOutlineColor: "#1C1E3B",
  } as StyleProp<FillLayerStyle>,
  witnessFill: {
    fillOpacity: 0.4,
    fillColor: colors.primary,
    fillOutlineColor: "#1C1E3B",
  } as StyleProp<FillLayerStyle>,
});

const hotspotsEqual = (prev: Hotspot[] | Witness[], next: Hotspot[] | Witness[]) => {
  if (prev.length !== next.length) {
    return false;
  }

  const ownedHotspotsEqual = next === prev;
  if (!ownedHotspotsEqual) {
    // TODO: Fix to desired behavior
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    next.forEach((hotspot: Hotspot | Witness, index: number) => {
      const addressesEqual = hotspot.address === prev[index].address;
      if (!addressesEqual) {
        return false;
      }
    });
  }
  return true;
};

export default memo(Map, (prevProps, nextProps) => {
  const {
    mapCenter: prevMapCenter,
    selectedHotspot: prevSelectedHotspot,
    witnesses: prevWitnesses,
    ...prevRest
  } = prevProps;
  const { mapCenter, selectedHotspot, witnesses, ...nextRest } = nextProps;

  const primitivesEqual = Object.keys(prevRest).every((key) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return nextRest.hasOwnProperty(key) && nextRest[key] === prevRest[key];
  });
  let mapCenterEqual = mapCenter === prevMapCenter;
  if (!mapCenterEqual && mapCenter && prevMapCenter) {
    mapCenterEqual = mapCenter[0] === prevMapCenter[0] && mapCenter[1] === prevMapCenter[1];
  }

  const selectedHotspotEqual = prevSelectedHotspot?.address === selectedHotspot?.address;
  const witnessHotspotsEqual = hotspotsEqual(prevWitnesses || [], witnesses || []);
  return primitivesEqual && mapCenterEqual && selectedHotspotEqual && witnessHotspotsEqual;
});
