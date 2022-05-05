import React, { useCallback, useEffect, useState } from "react";

import { Hotspot } from "@helium/http";
import { OnboardingRecord } from "@helium/onboarding";
import { useOnboarding } from "@helium/react-native-sdk";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { ScrollView, Linking } from "react-native";
import Toast from "react-native-simple-toast";
import { useSelector } from "react-redux";

import { ActivityIndicatorCentered } from "components/ActivityIndicator";
import Box from "components/Box";
import { DebouncedButton } from "components/Button";
import HotspotLocationPreview from "components/HotspotLocationPreview";
import Text from "components/Text";
import WalletNotLinkedError from "components/WalletNotLinkedError";
import {
  SignedInStackParamList,
  SignedInStackNavigationProp,
} from "navigation/navigationRootTypes";
import { RootState } from "store/rootReducer";
import { getHotspotDetails } from "utils/appDataClient";
import { EXPLORER_BASE_URL } from "utils/config";
import useCheckLocationPermission from "utils/useCheckLocationPermission";

type Route = RouteProp<SignedInStackParamList, "HotspotDetails">;

const HotspotDetailsScreen = () => {
  const { t } = useTranslation();
  const {
    params: { hotspotAddress },
  } = useRoute<Route>();
  const { walletToken } = useSelector((state: RootState) => state.app);
  const navigation = useNavigation<SignedInStackNavigationProp>();

  const { isRequestingPermission, requestPermission } = useCheckLocationPermission();

  const [hotspot, setHotspot] = useState<Hotspot | undefined>();
  useEffect(() => {
    if (!hotspotAddress) {
      return;
    }

    getHotspotDetails(hotspotAddress).then(setHotspot);
  }, [hotspotAddress]);

  const { getOnboardingRecord } = useOnboarding();
  const [onboardingRecord, setOnboardingRecord] = useState<OnboardingRecord | null>();
  useEffect(() => {
    getOnboardingRecord(hotspotAddress).then(setOnboardingRecord);
  }, [getOnboardingRecord, hotspotAddress, setOnboardingRecord]);

  const updateAntenna = useCallback(async () => {
    if (!hotspot || !onboardingRecord) {
      return;
    }

    navigation.navigate("PickNewAntennaScreen", { hotspot, onboardingRecord });
  }, [hotspot, onboardingRecord, navigation]);

  const updateLocation = useCallback(async () => {
    if (!hotspot || !onboardingRecord) {
      return;
    }

    const isGranted = await requestPermission();
    if (!isGranted) {
      return;
    }

    navigation.navigate("PickNewLocationScreen", { hotspot, onboardingRecord });
  }, [hotspot, onboardingRecord, requestPermission, navigation]);

  const viewOnHeliumExplorer = useCallback(async () => {
    if (!hotspotAddress) {
      return;
    }

    const url = `${EXPLORER_BASE_URL}/hotspots/${hotspotAddress}`;

    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Toast.showWithGravity(t("generic.openLinkError", { url }), Toast.LONG, Toast.CENTER);
    }
  }, [t, hotspotAddress]);

  if (!hotspot || !onboardingRecord) {
    return <ActivityIndicatorCentered />;
  }

  return (
    <Box flex={1} backgroundColor="primaryBackground" paddingHorizontal="m" paddingBottom="l">
      {!hotspot ? (
        <Text variant="body1" textAlign="center">
          {t("hotspotDetailsScreen.noData")}
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
            {t("hotspotDetailsScreen.viewOnHeliumExplorer")}
          </Text>
          <ScrollView>
            <Box flex={1} marginTop="l">
              <Box flexDirection="row" justifyContent="space-between" marginBottom="l">
                <Text variant="body1" fontWeight="bold">
                  {t("hotspotDetailsScreen.statusLabel")}
                </Text>
                {hotspot.location ? (
                  <Text variant="body1" fontWeight="bold" textTransform="capitalize">
                    {hotspot.status?.online}
                  </Text>
                ) : (
                  <Text variant="body1" fontWeight="bold">
                    {t("generic.notAvailable")}
                  </Text>
                )}
              </Box>
              {hotspot.location && hotspot.lng !== undefined && hotspot.lat !== undefined ? (
                <Box height={200}>
                  <HotspotLocationPreview
                    mapCenter={[hotspot.lng, hotspot.lat]}
                    geocode={hotspot.geocode}
                  />
                </Box>
              ) : (
                <Box flexDirection="row" justifyContent="space-between">
                  <Text variant="body1" fontWeight="bold">
                    {t("hotspotDetailsScreen.locationLabel")}
                  </Text>
                  <Text variant="body1" fontWeight="bold">
                    {t("hotspotDetailsScreen.notSet")}
                  </Text>
                </Box>
              )}
              <Box flexDirection="row" justifyContent="space-between" marginTop="l">
                <Text variant="body1" fontWeight="bold">
                  {t("hotspot_setup.location_fee.gain_label")}
                </Text>
                {hotspot.gain ? (
                  <Text variant="body1" fontWeight="bold">
                    {t("hotspot_setup.location_fee.gain", {
                      gain: hotspot.gain / 10,
                    })}
                  </Text>
                ) : (
                  <Text variant="body1" fontWeight="bold">
                    {t("hotspotDetailsScreen.notSet")}
                  </Text>
                )}
              </Box>
              <Box flexDirection="row" justifyContent="space-between" marginTop="l">
                <Text variant="body1" fontWeight="bold">
                  {t("hotspot_setup.location_fee.elevation_label")}
                </Text>
                {hotspot.elevation ? (
                  <Text variant="body1" fontWeight="bold">
                    {t("hotspot_setup.location_fee.elevation", {
                      count: hotspot.elevation,
                    })}
                  </Text>
                ) : (
                  <Text variant="body1" fontWeight="bold">
                    {t("hotspotDetailsScreen.notSet")}
                  </Text>
                )}
              </Box>
            </Box>
          </ScrollView>
          {!walletToken && <WalletNotLinkedError />}
          {hotspot.location && (
            <DebouncedButton
              onPress={updateAntenna}
              color="primary"
              fullWidth
              title={t("hotspotDetailsScreen.updateAntennaBtn")}
              marginBottom="m"
            />
          )}
          <DebouncedButton
            onPress={updateLocation}
            disabled={isRequestingPermission}
            color="primary"
            fullWidth
            title={t(
              `hotspotDetailsScreen.${hotspot.location ? "updateLocationBtn" : "setLocationBtn"}`,
            )}
          />
        </>
      )}
    </Box>
  );
};

export default HotspotDetailsScreen;
