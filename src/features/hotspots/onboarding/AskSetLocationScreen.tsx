import React, { useCallback } from "react";

import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

import AskLocationIcon from "assets/images/ask-location-icon.svg";
import Box from "components/Box";
import { DebouncedButton } from "components/Button";
import Text from "components/Text";
import {
  HotspotOnboardingNavigationProp,
  HotspotOnboardingStackParamList,
} from "navigation/hotspotOnboardingNavigatorTypes";
import useCheckLocationPermission from "utils/useCheckLocationPermission";

type Route = RouteProp<HotspotOnboardingStackParamList, "AskSetLocationScreen">;

const AskSetLocationScreen = () => {
  const { t } = useTranslation();
  const { params } = useRoute<Route>();
  const navigation = useNavigation<HotspotOnboardingNavigationProp>();

  const { isRequestingPermission, requestPermission } = useCheckLocationPermission();

  const locationAssert = useCallback(async () => {
    const isGranted = await requestPermission();
    if (!isGranted) {
      return;
    }

    navigation.navigate("PickLocationScreen", params);
  }, [navigation, params, requestPermission]);

  const skipLocationAssert = useCallback(() => {
    navigation.navigate("SkipLocationScreen", params);
  }, [navigation, params]);

  return (
    <Box flex={1} backgroundColor="primaryBackground" paddingHorizontal="m" paddingBottom="l">
      <Text variant="h2" numberOfLines={1} adjustsFontSizeToFit marginBottom="l" textAlign="center">
        {t("hotspotOnboarding.askSetLocationScreen.title")}
      </Text>
      <Box flex={1} alignItems="center" justifyContent="center" marginBottom="s">
        <AskLocationIcon width={100} height={100} />
        <Text variant="subtitle1" marginTop="l">
          {t("hotspotOnboarding.askSetLocationScreen.subtitle1")}
        </Text>
        <Text variant="subtitle1" marginBottom="l">
          {t("hotspotOnboarding.askSetLocationScreen.subtitle2")}
        </Text>
        <Text variant="subtitle2">{t("hotspotOnboarding.askSetLocationScreen.p1")}</Text>
      </Box>
      <DebouncedButton
        onPress={locationAssert}
        disabled={isRequestingPermission}
        color="primary"
        title={t("hotspotOnboarding.askSetLocationScreen.next")}
        marginBottom="m"
        fullWidth
      />
      <DebouncedButton
        onPress={skipLocationAssert}
        color="secondary"
        title={t("hotspotOnboarding.askSetLocationScreen.cancel")}
        fullWidth
      />
    </Box>
  );
};

export default AskSetLocationScreen;
