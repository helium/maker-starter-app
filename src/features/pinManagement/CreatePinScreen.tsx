import React, { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";

import Text from "components/Text";
import PinDisplay from "components/PinDisplay";
import Keypad from "components/Keypad";
import Box from "components/Box";
import {
  SignedInStackNavigationProp,
  SignedInStackParamList,
} from "navigation/navigationRootTypes";

type Route = RouteProp<SignedInStackParamList, "CreatePinScreen">;

const AccountCreatePinScreen = () => {
  const { t } = useTranslation();
  const { params: { pinReset } = { fromImport: false, pinReset: false } } = useRoute<Route>();
  const navigation = useNavigation<SignedInStackNavigationProp>();

  const [pin, setPin] = useState("");

  useEffect(() => {
    if (pin.length === 6) {
      navigation.push("ConfirmPinScreen", {
        pin,
        pinReset,
      });
    }
  }, [pin, pinReset, navigation]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      setPin("");
    });

    return unsubscribe;
  }, [navigation]);

  const handleBackspace = useCallback(() => {
    setPin((val) => val.slice(0, -1));
  }, []);

  const handleNumber = useCallback((num: number) => {
    setPin((val) => (val.length < 6 ? val + num : val));
  }, []);

  return (
    <Box
      flex={1}
      backgroundColor="primaryBackground"
      paddingHorizontal="m"
      justifyContent="center"
      alignItems="center"
    >
      <Text
        marginBottom="m"
        variant="h1"
        maxFontSizeMultiplier={1}
        numberOfLines={1}
        adjustsFontSizeToFit
      >
        {t("pinManagement.createPin.title")}
      </Text>

      <Text variant="body1" maxFontSizeMultiplier={1.2}>
        {t("pinManagement.createPin.subtitle")}
      </Text>
      <PinDisplay length={pin.length} marginVertical="xl" />
      <Keypad
        onBackspacePress={handleBackspace}
        onNumberPress={handleNumber}
        onCustomButtonPress={pinReset ? navigation.goBack : undefined}
        customButtonTitle={t("generic.cancel")}
      />
    </Box>
  );
};

export default AccountCreatePinScreen;
