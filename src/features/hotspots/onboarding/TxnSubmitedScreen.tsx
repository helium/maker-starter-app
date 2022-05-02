import React from "react";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { useAsync } from "react-async-hook";
import { useOnboarding } from "@helium/react-native-sdk";
import { AssertLocationV2 } from "@helium/transactions";

import Box from "../../../components/Box";
import { DebouncedButton } from "../../../components/Button";
import Text from "../../../components/Text";
import { submitTxn } from "../../../utils/appDataClient";
import { SignedInStackNavigationProp } from "../../../navigation/navigationRootTypes";
import { HotspotOnboardingStackParamList } from "../../../navigation/hotspotOnboardingNavigatorTypes";

type Route = RouteProp<HotspotOnboardingStackParamList, "TxnSubmitedScreen">;

const TxnSubmitedScreen = () => {
  const { t } = useTranslation();
  const { params } = useRoute<Route>();
  const navigation = useNavigation<SignedInStackNavigationProp>();
  const { postPaymentTransaction } = useOnboarding();

  useAsync(async () => {
    if (!params.gatewayAddress) {
      throw new Error("Gateway address not found");
    }
    if (params.gatewayTxn) {
      const gatewayTxn = await postPaymentTransaction(params.gatewayAddress, params.gatewayTxn);

      if (!gatewayTxn) {
        return;
      }
      await submitTxn(gatewayTxn);
    }

    if (params.assertTxn) {
      let finalTxn = params.assertTxn;
      const assertTxn = AssertLocationV2.fromString(finalTxn);

      const isFree = assertTxn.owner?.b58 !== assertTxn.payer?.b58; // Maker is paying
      if (isFree) {
        // If the maker is paying, post to onboarding
        const onboardAssertTxn = await postPaymentTransaction(
          params.gatewayAddress,
          params.assertTxn,
        );
        if (!onboardAssertTxn) return;

        finalTxn = onboardAssertTxn;
      }
      await submitTxn(finalTxn);
    }
  }, []);

  return (
    <Box flex={1} backgroundColor="primaryBackground" paddingHorizontal="m" paddingBottom="l">
      <Box flex={1} alignItems="center" justifyContent="center">
        <Text variant="h3" marginBottom="xl" numberOfLines={1} adjustsFontSizeToFit>
          {t("hotspotOnboarding.txnSubmitedScreen.title")}
        </Text>

        <Text variant="body1" textAlign="center">
          {t("hotspotOnboarding.txnSubmitedScreen.subtitle")}
        </Text>
      </Box>

      <DebouncedButton
        onPress={() => navigation.navigate("MainTabs")}
        color="primary"
        title={t("hotspotOnboarding.txnSubmitedScreen.next")}
        fullWidth
      />
    </Box>
  );
};

export default TxnSubmitedScreen;
