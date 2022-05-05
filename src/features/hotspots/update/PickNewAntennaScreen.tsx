import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { KeyboardAvoidingView, StyleSheet } from "react-native";

import Box from "components/Box";
import Text from "components/Text";
import { DebouncedButton } from "components/Button";
import HotspotConfigurationPicker from "components/HotspotConfigurationPicker";
import { Antenna, defaultAntenna } from "types/Antenna";
import {
  SignedInStackNavigationProp,
  SignedInStackParamList,
} from "navigation/navigationRootTypes";

type Route = RouteProp<SignedInStackParamList, "PickNewAntennaScreen">;

const PickNewAntennaScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<SignedInStackNavigationProp>();
  const {
    params: { onboardingRecord, hotspot },
  } = useRoute<Route>();

  const [antenna, setAntenna] = useState<Antenna>(defaultAntenna);
  const [gain, setGain] = useState<number>(defaultAntenna.gain);
  const [elevation, setElevation] = useState<number>(0);

  const navNext = useCallback(async () => {
    if (!antenna) return;

    navigation.navigate("ConfirmAntennaUpdateScreen", {
      onboardingRecord,
      hotspot,
      antenna,
      gain,
      elevation,
    });
  }, [navigation, onboardingRecord, hotspot, antenna, gain, elevation]);

  return (
    <Box flex={1} backgroundColor="primaryBackground" paddingHorizontal="m" paddingBottom="l">
      <KeyboardAvoidingView style={styles.keyboardAvoidingView} behavior="padding">
        <Box flex={1}>
          <Text
            variant="h2"
            numberOfLines={1}
            adjustsFontSizeToFit
            marginBottom="l"
            textAlign="center"
          >
            {t("pickNewAntennaScreen.title")}
          </Text>

          <Text variant="subtitle2" numberOfLines={2} adjustsFontSizeToFit textAlign="center">
            {t("pickNewAntennaScreen.subtitle")}
          </Text>

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

export default PickNewAntennaScreen;
