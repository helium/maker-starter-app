import React, { useEffect, useRef, useState } from "react";

import { useTranslation } from "react-i18next";
import { Alert, TextInput, TouchableWithoutFeedback } from "react-native";

import InfoIcon from "assets/images/info-hollow.svg";
import { decimalSeparator, groupSeparator, locale } from "i18n";
import { useColors, useTextVariants } from "theme/themeHooks";
import { Antenna, antennas, customAntenna } from "types/Antenna";

import Box from "./Box";
import HeliumActionSheet from "./HeliumActionSheet";
import Text from "./Text";
import TouchableOpacityBox from "./TouchableOpacityBox";

type Props = {
  onAntennaUpdated: (antenna: Antenna) => void;
  onGainUpdated: (gain: number) => void;
  onElevationUpdated: (elevation: number) => void;
  selectedAntenna?: Antenna;
};

const HotspotConfigurationPicker = ({
  selectedAntenna,
  onAntennaUpdated,
  onGainUpdated,
  onElevationUpdated,
}: Props) => {
  const { t } = useTranslation();
  const colors = useColors();
  const textVariants = useTextVariants();

  const gainInputRef = useRef<TextInput | null>(null);
  const elevationInputRef = useRef<TextInput | null>(null);

  const [gain, setGain] = useState<string | undefined>(
    selectedAntenna
      ? selectedAntenna.gain.toLocaleString(locale, {
          maximumFractionDigits: 1,
          minimumFractionDigits: 1,
        })
      : undefined,
  );

  const onSelectAntenna = (_value: string | number, index: number) => {
    const antenna = antennas[index];
    onAntennaUpdated(antenna);
    onGainUpdated(antenna.gain);
    setGain(
      antenna.gain.toLocaleString(locale, {
        maximumFractionDigits: 1,
        minimumFractionDigits: 1,
      }),
    );
  };

  const showElevationInfo = () =>
    Alert.alert(t("antennas.elevation_info.title"), t("antennas.elevation_info.desc"));
  const showGainInfo = () =>
    Alert.alert(t("antennas.gain_info.title"), t("antennas.gain_info.desc"));

  const focusGain = () => {
    gainInputRef.current?.focus();
  };
  const focusElevation = () => {
    elevationInputRef.current?.focus();
  };

  const onChangeGain = (text: string) => setGain(text);
  const onDoneEditingGain = () => {
    let gainFloat = gain
      ? parseFloat(gain.replace(groupSeparator, "").replace(decimalSeparator, "."))
      : 0;
    let gainString;
    if (!gainFloat || gainFloat <= 1) {
      gainString = "1";
    } else if (gainFloat >= 15) {
      gainString = "15";
      gainFloat = 15;
    } else {
      gainString = gainFloat.toLocaleString(locale, {
        maximumFractionDigits: 1,
      });
    }
    setGain(gainString);
    onGainUpdated(gainFloat);
  };

  const onChangeElevation = (text: string) => {
    const elevationInteger = text
      ? parseInt(text.replace(groupSeparator, "").replace(decimalSeparator, "."), 10)
      : 0;
    let stringElevation;
    if (!elevationInteger) {
      stringElevation = "0";
    } else {
      stringElevation = elevationInteger.toString();
    }
    onElevationUpdated(parseInt(stringElevation, 10));
  };

  useEffect(() => {
    if (selectedAntenna) {
      setGain(
        selectedAntenna.gain.toLocaleString(locale, {
          maximumFractionDigits: 1,
          minimumFractionDigits: 1,
        }),
      );
    }
  }, [selectedAntenna]);

  return (
    <Box backgroundColor="surfaceSecondary" borderRadius="m" marginVertical="l">
      <HeliumActionSheet
        title={t("antennas.onboarding.select")}
        textProps={{
          variant: "body2",
          fontSize: textVariants.body2.fontSize,
          fontWeight: "bold",
          color: "primaryText",
        }}
        initialValue={t("antennas.onboarding.select")}
        data={antennas}
        iconColor="primaryText"
        selectedValue={selectedAntenna?.id}
        onValueSelected={onSelectAntenna}
        buttonProps={{ justifyContent: "space-between" }}
        padding="m"
        paddingVertical="l"
        maxModalHeight={700}
      />
      <Box backgroundColor="primaryBackground" height={1} paddingVertical="xxs" />
      <TouchableWithoutFeedback onPress={focusGain}>
        <Box
          padding="m"
          paddingVertical="l"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box flexDirection="row" alignItems="center">
            <Text variant="body2" color="primaryText" fontWeight="bold" marginRight="xs">
              {t("antennas.onboarding.gain")}
            </Text>
            <TouchableOpacityBox onPress={showGainInfo} padding="xs">
              <InfoIcon color={colors.linkText} />
            </TouchableOpacityBox>
          </Box>
          <Box flexDirection="row" alignItems="center" visible={gain !== undefined}>
            <TextInput
              ref={gainInputRef}
              keyboardType="numeric"
              value={gain}
              returnKeyType="done"
              onChangeText={onChangeGain}
              onEndEditing={onDoneEditingGain}
              editable={selectedAntenna?.id === customAntenna.id}
            />
            <Text marginLeft="xxs">{t("antennas.onboarding.dbi")}</Text>
          </Box>
        </Box>
      </TouchableWithoutFeedback>
      <Box backgroundColor="primaryBackground" height={1} paddingVertical="xxs" />
      <TouchableWithoutFeedback onPress={focusElevation}>
        <Box
          padding="m"
          paddingVertical="l"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box flexDirection="row" alignItems="center">
            <Text variant="body2" color="primaryText" fontWeight="bold" marginRight="xs">
              {t("antennas.onboarding.elevation")}
            </Text>
            <TouchableOpacityBox onPress={showElevationInfo} padding="xs">
              <InfoIcon color={colors.linkText} />
            </TouchableOpacityBox>
          </Box>
          <TextInput
            ref={elevationInputRef}
            placeholder="0"
            keyboardType="numeric"
            returnKeyType="done"
            onChangeText={onChangeElevation}
          />
        </Box>
      </TouchableWithoutFeedback>
    </Box>
  );
};

export default HotspotConfigurationPicker;
