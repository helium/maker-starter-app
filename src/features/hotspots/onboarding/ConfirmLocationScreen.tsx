import React, { useCallback, useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { useTranslation } from "react-i18next";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Balance, DataCredits, Location, NetworkTokens, USDollars } from "@helium/react-native-sdk";
import type { Account } from "@helium/http";
import { useSelector } from "react-redux";

import Box from "components/Box";
import { DebouncedButton } from "components/Button";
import Text from "components/Text";
import { decimalSeparator, groupSeparator } from "i18n";
import { RootState } from "store/rootReducer";
import { getAccount } from "utils/appDataClient";
import {
  HotspotOnboardingNavigationProp,
  HotspotOnboardingStackParamList,
} from "navigation/hotspotOnboardingNavigatorTypes";
import HotspotLocationPreview from "components/HotspotLocationPreview";
import { ActivityIndicatorCentered } from "components/ActivityIndicator";

type Route = RouteProp<HotspotOnboardingStackParamList, "ConfirmLocationScreen">;

const ConfirmLocationScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<HotspotOnboardingNavigationProp>();
  const [account, setAccount] = useState<Account>();
  const { walletAddress: ownerAddress } = useSelector((state: RootState) => state.app);
  const [feeData, setFeeData] = useState<{
    isFree: boolean;
    hasSufficientBalance: boolean;
    remainingFreeAsserts: number;
    totalStakingAmount: Balance<NetworkTokens>;
    totalStakingAmountDC: Balance<DataCredits>;
    totalStakingAmountUsd: Balance<USDollars>;
  }>();
  const { params } = useRoute<Route>();
  const { onboardingRecord, elevation, gain, coords } = params;

  useEffect(() => {
    if (!ownerAddress) return;
    getAccount(ownerAddress).then(setAccount);
  }, [ownerAddress]);

  useEffect(() => {
    if (!onboardingRecord || !ownerAddress || !account?.balance) {
      return;
    }

    Location.loadLocationFeeData({
      nonce: 0,
      accountIntegerBalance: account.balance.integerBalance,
      dataOnly: false,
      owner: ownerAddress,
      locationNonceLimit: onboardingRecord.maker.locationNonceLimit,
      makerAddress: onboardingRecord.maker.address,
    }).then(setFeeData);
  }, [onboardingRecord, ownerAddress, account]);

  const navNext = useCallback(async () => {
    navigation.replace("TxnProgressScreen", params);
  }, [navigation, params]);

  if (!feeData) {
    return (
      <Box flex={1} backgroundColor="primaryBackground" paddingHorizontal="m" paddingBottom="m">
        <Box flex={1} paddingBottom="xxl">
          <ActivityIndicatorCentered />
        </Box>
      </Box>
    );
  }

  const { isFree, hasSufficientBalance, totalStakingAmount } = feeData;

  return (
    <Box flex={1} backgroundColor="primaryBackground" paddingHorizontal="m" paddingBottom="l">
      <ScrollView>
        <Box flex={1} paddingBottom="m">
          <Text
            variant="h2"
            numberOfLines={1}
            adjustsFontSizeToFit
            marginBottom="l"
            textAlign="center"
          >
            {t("hotspot_setup.location_fee.title")}
          </Text>

          <Text variant="subtitle1" marginBottom="s" textAlign="center">
            {t(
              isFree
                ? "hotspot_setup.location_fee.subtitle_free"
                : "hotspot_setup.location_fee.subtitle_fee",
            )}
          </Text>

          <Text
            variant="subtitle1"
            marginBottom={{ phone: "m", smallPhone: "ms" }}
            numberOfLines={2}
            adjustsFontSizeToFit
          >
            {t("hotspot_setup.location_fee.confirm_location")}
          </Text>

          <Box height={200} marginBottom={{ phone: "m", smallPhone: "ms" }}>
            <HotspotLocationPreview mapCenter={coords} locationName={params.locationName} />
          </Box>

          <Box
            flexDirection="row"
            justifyContent="space-between"
            marginBottom={{ phone: "m", smallPhone: "ms" }}
          >
            <Text variant="body1" color="primaryText">
              {t("hotspot_setup.location_fee.gain_label")}
            </Text>
            <Text variant="body1" color="primaryText">
              {t("hotspot_setup.location_fee.gain", { gain })}
            </Text>
          </Box>

          <Box
            flexDirection="row"
            justifyContent="space-between"
            marginBottom={{ phone: "m", smallPhone: "ms" }}
          >
            <Text variant="body1" color="primaryText">
              {t("hotspot_setup.location_fee.elevation_label")}
            </Text>
            <Text variant="body1" color="primaryText">
              {t("hotspot_setup.location_fee.elevation", { count: elevation })}
            </Text>
          </Box>

          {!isFree && (
            <>
              <Box
                flexDirection="row"
                justifyContent="space-between"
                marginBottom={{ phone: "m", smallPhone: "ms" }}
              >
                <Text variant="body1" color="primaryText">
                  {t("hotspot_setup.location_fee.balance")}
                </Text>
                <Text variant="body1" color={hasSufficientBalance ? "primaryText" : "error"}>
                  {account?.balance?.toString(2, {
                    groupSeparator,
                    decimalSeparator,
                  })}
                </Text>
              </Box>

              <Box
                flexDirection="row"
                justifyContent="space-between"
                marginBottom={{ phone: "m", smallPhone: "ms" }}
              >
                <Text variant="body1" color="primaryText">
                  {t("hotspot_setup.location_fee.fee")}
                </Text>
                <Text variant="body1" color="primaryText">
                  {totalStakingAmount.toString(2)}
                </Text>
              </Box>

              {!hasSufficientBalance && (
                <Text variant="body2" color="error" textAlign="center">
                  {t("hotspot_setup.location_fee.no_funds")}
                </Text>
              )}
            </>
          )}
        </Box>
      </ScrollView>
      <Box>
        <DebouncedButton
          title={
            isFree ? t("hotspot_setup.location_fee.next") : t("hotspot_setup.location_fee.fee_next")
          }
          color="primary"
          onPress={navNext}
          disabled={isFree ? false : !hasSufficientBalance}
        />
      </Box>
    </Box>
  );
};

export default ConfirmLocationScreen;
