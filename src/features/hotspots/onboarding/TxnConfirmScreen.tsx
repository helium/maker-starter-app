import React, { useCallback, useEffect, useState } from "react";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { AddGateway, useOnboarding } from "@helium/react-native-sdk";
import { OnboardingRecord } from "@helium/onboarding";
import { useSelector } from "react-redux";

import Text from "components/Text";
import animateTransition from "utils/animateTransition";
import { DebouncedButton } from "components/Button";
import { RootState } from "store/rootReducer";
import Box from "components/Box";
import {
  HotspotOnboardingNavigationProp,
  HotspotOnboardingStackParamList,
} from "navigation/hotspotOnboardingNavigatorTypes";
import { ActivityIndicator } from "components/ActivityIndicator";

type Route = RouteProp<HotspotOnboardingStackParamList, "TxnConfirmScreen">;

const TxnConfirmScreen = () => {
  const { t } = useTranslation();
  const { params } = useRoute<Route>();
  const navigation = useNavigation<HotspotOnboardingNavigationProp>();
  const { walletAddress: address } = useSelector((state: RootState) => state.app);
  const [publicKey, setPublicKey] = useState("");
  const [macAddress, setMacAddress] = useState("");
  const [ownerAddress, setOwnerAddress] = useState("");
  const [onboardingRecord, setOnboardingRecord] = useState<OnboardingRecord>();

  const { getOnboardingRecord } = useOnboarding();

  useEffect(() => {
    if (!publicKey) return;

    const getRecord = async () => {
      const record = await getOnboardingRecord(publicKey);

      if (!record) return;

      animateTransition("TxnConfirmScreen.GetMac");
      setMacAddress(record.macEth0 || t("generic.unknown"));
      setOnboardingRecord(record);
    };
    getRecord();
  }, [publicKey, t, getOnboardingRecord]);

  useEffect(() => {
    if (!params.addGatewayTxn) return;

    const addGatewayTxn = AddGateway.txnFromString(params.addGatewayTxn);

    setPublicKey(addGatewayTxn.gateway?.b58 || "");
    setOwnerAddress(addGatewayTxn.owner?.b58 || "");
  }, [params]);

  const navNext = useCallback(() => {
    if (!onboardingRecord) return;
    navigation.push("AskSetLocationScreen", {
      addGatewayTxn: params.addGatewayTxn,
      hotspotAddress: publicKey,
      onboardingRecord,
    });
  }, [navigation, onboardingRecord, params, publicKey]);

  return (
    <Box flex={1} backgroundColor="primaryBackground" paddingHorizontal="m" paddingBottom="l">
      <Text variant="h2" marginBottom="l" numberOfLines={1} adjustsFontSizeToFit textAlign="center">
        {t("hotspotOnboarding.txnConfirmScreen.title")}
      </Text>

      <Box
        backgroundColor="secondaryBackground"
        padding="m"
        borderTopLeftRadius="s"
        borderTopRightRadius="s"
        justifyContent="center"
        marginBottom="m"
      >
        <Text variant="body1" fontWeight="bold">
          {t("hotspotOnboarding.txnConfirmScreen.publicKey")}
        </Text>
        <Text variant="body1" marginTop="s" numberOfLines={2} adjustsFontSizeToFit>
          {publicKey}
        </Text>
      </Box>

      <Box
        backgroundColor="secondaryBackground"
        padding="m"
        justifyContent="center"
        marginBottom="m"
      >
        <Text variant="body1" fontWeight="bold">
          {t("hotspotOnboarding.txnConfirmScreen.macAddress")}
        </Text>
        {macAddress ? (
          <Text variant="body1" marginTop="s">
            {macAddress}
          </Text>
        ) : (
          <Box marginTop="s">
            <ActivityIndicator />
          </Box>
        )}
      </Box>

      <Box
        backgroundColor="secondaryBackground"
        padding="m"
        borderBottomLeftRadius="s"
        borderBottomRightRadius="s"
        justifyContent="center"
        marginBottom="m"
      >
        <Text variant="body1" fontWeight="bold">
          {t("hotspotOnboarding.txnConfirmScreen.ownerAddress")}
        </Text>
        <Text variant="body1" marginTop="s" numberOfLines={2} adjustsFontSizeToFit>
          {ownerAddress}
        </Text>
      </Box>

      <Box flex={1} />

      <DebouncedButton
        title={t("generic.next")}
        color="primary"
        onPress={navNext}
        disabled={ownerAddress !== address}
        fullWidth
      />
    </Box>
  );
};

export default TxnConfirmScreen;
