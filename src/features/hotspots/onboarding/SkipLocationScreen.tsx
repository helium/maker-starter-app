import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";

import SkipLocationIcon from "@assets/images/skip-location-icon.svg";
import Box from "../../../components/Box";
import { DebouncedButton } from "../../../components/Button";
import Text from "../../../components/Text";
import {
  HotspotOnboardingNavigationProp,
  HotspotOnboardingStackParamList,
} from "../../../navigation/hotspotOnboardingNavigatorTypes";

type Route = RouteProp<HotspotOnboardingStackParamList, "SkipLocationScreen">;

const SkipLocationScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<HotspotOnboardingNavigationProp>();

  const { params } = useRoute<Route>();

  const navNext = useCallback(async () => {
    navigation.replace("TxnProgressScreen", params);
  }, [navigation, params]);

  return (
    <Box flex={1} backgroundColor="primaryBackground" paddingHorizontal="m" paddingBottom="l">
      <Text variant="h2" numberOfLines={1} adjustsFontSizeToFit marginBottom="l" textAlign="center">
        {t("hotspotOnboarding.skipLocationScreen.title")}
      </Text>

      <Box flex={1} alignItems="center" justifyContent="center" marginBottom="s">
        <SkipLocationIcon width={100} height={100} />

        <Text variant="subtitle1" marginTop="l" marginBottom="l">
          {t("hotspotOnboarding.skipLocationScreen.subtitle1")}
        </Text>

        <Text variant="subtitle2">{t("hotspotOnboarding.skipLocationScreen.subtitle2")}</Text>
      </Box>

      <DebouncedButton
        title={t("hotspotOnboarding.skipLocationScreen.next")}
        color="primary"
        onPress={navNext}
        fullWidth
      />
    </Box>
  );
};

export default SkipLocationScreen;
