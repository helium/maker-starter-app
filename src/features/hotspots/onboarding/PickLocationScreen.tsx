import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Position } from "geojson";
import Search from "assets/images/search.svg";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { Image } from "react-native";

import Box from "components/Box";
import { DebouncedButton } from "components/Button";
import Map from "components/Map";
import Text from "components/Text";
import { reverseGeocode } from "utils/location";
import sleep from "utils/sleep";
import {
  HotspotOnboardingNavigationProp,
  HotspotOnboardingStackParamList,
} from "navigation/hotspotOnboardingNavigatorTypes";
import TouchableOpacityBox from "components/TouchableOpacityBox";
import { useColors, useSpacing } from "theme/themeHooks";
import { PlaceGeography } from "utils/googlePlaces";
import AddressSearchModal from "./AddressSearchModal";

type Route = RouteProp<HotspotOnboardingStackParamList, "PickLocationScreen">;

const PickLocationScreen = () => {
  const { t } = useTranslation();
  const { params } = useRoute<Route>();
  const navigation = useNavigation<HotspotOnboardingNavigationProp>();
  const [disabled, setDisabled] = useState(true);
  const [mapCenter, setMapCenter] = useState([-122.419, 37.775]);
  const [markerCenter, setMarkerCenter] = useState([-122.419, 37.775]);
  const [hasGPSLocation, setHasGPSLocation] = useState(false);
  const [locationName, setLocationName] = useState("");
  const spacing = useSpacing();
  const searchModal = useRef<BottomSheetModal>(null);
  const colors = useColors();

  useEffect(() => {
    const sleepThenEnable = async () => {
      await sleep(3000);
      setDisabled(false);
    };
    sleepThenEnable();
  }, []);

  const onMapMoved = useCallback(async (newCoords?: Position) => {
    if (newCoords) {
      setMarkerCenter(newCoords);

      const [longitude, latitude] = newCoords;
      const adresses = await reverseGeocode(latitude, longitude);

      let name = "Loading...";
      if (adresses && adresses[0]) {
        const { street, city, country } = adresses[0];

        if (street && city && country) {
          name = [street, city, country].join(", ");
        }
      }
      setLocationName(name);
    }
  }, []);

  const navNext = useCallback(() => {
    navigation.navigate("AntennaSetupScreen", {
      ...params,
      coords: markerCenter,
      locationName,
    });
  }, [locationName, markerCenter, navigation, params]);

  const onDidFinishLoadingMap = useCallback((latitude: number, longitude: number) => {
    setHasGPSLocation(true);
    setMapCenter([longitude, latitude]);
  }, []);

  const handleSearchPress = useCallback(() => {
    searchModal.current?.present();
  }, []);

  const handleSelectPlace = useCallback((placeGeography: PlaceGeography) => {
    setMapCenter([placeGeography.lng, placeGeography.lat]);
    searchModal.current?.dismiss();
  }, []);

  const searchSnapPoints = useMemo(() => ["85%", "100%"], []);

  return (
    <Box flex={1} backgroundColor="primaryBackground">
      <Box flex={1}>
        <TouchableOpacityBox
          onPress={handleSearchPress}
          position="absolute"
          top={spacing.m}
          right={spacing.m}
          zIndex={1}
        >
          <Search width={30} height={30} color={colors.primaryText} />
        </TouchableOpacityBox>
        <Map
          maxZoomLevel={17}
          mapCenter={mapCenter}
          onMapMoved={onMapMoved}
          onDidFinishLoadingMap={onDidFinishLoadingMap}
          markerLocation={markerCenter}
          currentLocationEnabled
        />
      </Box>
      <Box padding="m" paddingBottom="l">
        <Box alignItems="center" marginBottom="m">
          <Text variant="subtitle1" fontWeight="bold" marginBottom="s">
            {t("hotspotOnboarding.pickLocationScreen.title")}
          </Text>

          <Box flexDirection="row" alignItems="center">
            {!!locationName && <Image source={require("assets/images/selectedLocation.png")} />}
            <Text variant="subtitle2" marginLeft="m">
              {locationName}
            </Text>
          </Box>
        </Box>
        <DebouncedButton
          onPress={navNext}
          color="primary"
          disabled={disabled || !hasGPSLocation}
          title={t("hotspotOnboarding.pickLocationScreen.next")}
          fullWidth
        />
      </Box>

      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={searchModal}
          snapPoints={searchSnapPoints}
          backdropComponent={BottomSheetBackdrop}
          backgroundStyle={{
            backgroundColor: colors.primaryBackground,
          }}
          handleIndicatorStyle={{
            backgroundColor: colors.primaryText,
            opacity: 0.5,
          }}
        >
          <AddressSearchModal onSelectPlace={handleSelectPlace} />
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </Box>
  );
};

export default memo(PickLocationScreen);
