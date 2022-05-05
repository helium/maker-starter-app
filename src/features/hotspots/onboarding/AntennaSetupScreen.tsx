import React, { useCallback, useState } from "react";

import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { KeyboardAvoidingView, StyleSheet } from "react-native";

import Box from "components/Box";
import { DebouncedButton } from "components/Button";
import HotspotConfigurationPicker from "components/HotspotConfigurationPicker";
import Text from "components/Text";
import {
  HotspotOnboardingNavigationProp,
  HotspotOnboardingStackParamList,
} from "navigation/hotspotOnboardingNavigatorTypes";
import { Antenna, defaultAntenna } from "types/Antenna";

type Route = RouteProp<HotspotOnboardingStackParamList, "AntennaSetupScreen">;

const AntennaSetupScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<HotspotOnboardingNavigationProp>();
  const { params } = useRoute<Route>();

  const [antenna, setAntenna] = useState<Antenna>(defaultAntenna);
  const [gain, setGain] = useState<number>(defaultAntenna.gain);
  const [elevation, setElevation] = useState<number>(0);

  const navNext = useCallback(async () => {
    if (!antenna) {
      return;
    }

    navigation.navigate("ConfirmLocationScreen", {
      ...params,
      gain,
      elevation,
    });
  }, [antenna, elevation, gain, navigation, params]);

  return (
    <Box flex={1} backgroundColor="primaryBackground" paddingHorizontal="m" paddingBottom="l">
      <KeyboardAvoidingView style={styles.keyboardAvoidingView} behavior="padding">
        <Box flex={1}>
          <Box>
            <Text
              variant="h2"
              numberOfLines={1}
              adjustsFontSizeToFit
              marginBottom="l"
              textAlign="center"
            >
              {t("antennas.onboarding.title")}
            </Text>
            <Text variant="subtitle2" numberOfLines={2} adjustsFontSizeToFit textAlign="center">
              {t("antennas.onboarding.subtitle")}
            </Text>
          </Box>
          <HotspotConfigurationPicker
            selectedAntenna={antenna}
            onAntennaUpdated={setAntenna}
            onGainUpdated={setGain}
            onElevationUpdated={setElevation}
          />
        </Box>
      </KeyboardAvoidingView>
      <DebouncedButton title={t("generic.next")} onPress={navNext} color="primary" fullWidth />
    </Box>
  );
};

const styles = StyleSheet.create({ keyboardAvoidingView: { flex: 1 } });

export default AntennaSetupScreen;
