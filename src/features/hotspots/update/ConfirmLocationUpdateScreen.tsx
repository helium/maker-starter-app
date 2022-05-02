import React, { useCallback, useEffect, useState } from "react";
import { ScrollView, Linking } from "react-native";
import { useTranslation } from "react-i18next";
import { RouteProp, useRoute } from "@react-navigation/native";
import {
  Balance,
  DataCredits,
  Location,
  NetworkTokens,
  USDollars,
  HotspotErrorCode,
  WalletLink,
} from "@helium/react-native-sdk";
import { AssertLocationV2 } from "@helium/transactions";
import { isString } from "lodash";
import { useSelector } from "react-redux";
import Toast from "react-native-simple-toast";

import type { Account } from "@helium/http";

import { RootState } from "../../../store/rootReducer";
import useAlert from "../../../utils/useAlert";
import Box from "../../../components/Box";
import { DebouncedButton } from "../../../components/Button";
import Text from "../../../components/Text";
import { decimalSeparator, groupSeparator } from "../../../i18n";
import { getAccount } from "../../../utils/appDataClient";
import { SignedInStackParamList } from "../../../navigation/navigationRootTypes";
import HotspotLocationPreview from "../../../components/HotspotLocationPreview";
import { ActivityIndicatorCentered } from "../../../components/ActivityIndicator";

type Route = RouteProp<SignedInStackParamList, "ConfirmLocationUpdateScreen">;

const ConfirmLocationUpdateScreen = () => {
  const { t } = useTranslation();
  const { showOKAlert } = useAlert();
  const { walletToken, walletAddress } = useSelector((state: RootState) => state.app);
  const {
    params: { hotspot, onboardingRecord, coords, locationName },
  } = useRoute<Route>();

  const [account, setAccount] = useState<Account>();
  useEffect(() => {
    getAccount(walletAddress).then(setAccount);
  }, [walletAddress]);

  const [feeData, setFeeData] = useState<{
    isFree: boolean;
    hasSufficientBalance: boolean;
    remainingFreeAsserts: number;
    totalStakingAmount: Balance<NetworkTokens>;
    totalStakingAmountDC: Balance<DataCredits>;
    totalStakingAmountUsd: Balance<USDollars>;
  }>();
  useEffect(() => {
    const calculateLocationUpdateFee = async () => {
      if (!walletAddress || !account?.balance) return;

      const locationFeeData = await Location.loadLocationFeeData({
        nonce: (hotspot.speculativeNonce || 0) + 1,
        accountIntegerBalance: account.balance.integerBalance,
        dataOnly: hotspot.mode === "dataonly",
        owner: walletAddress,
        locationNonceLimit: onboardingRecord.maker.locationNonceLimit,
        makerAddress: onboardingRecord.maker.address,
      });

      setFeeData(locationFeeData);
    };

    calculateLocationUpdateFee();
  }, [walletAddress, account, hotspot, onboardingRecord, setFeeData]);

  const [updateTxn, setUpdateTxn] = useState<AssertLocationV2>();
  useEffect(() => {
    const createUpdateTxn = async () => {
      if (!walletToken) return;

      const parsed = WalletLink.parseWalletLinkToken(walletToken);
      if (!parsed?.address) throw new Error("Invalid Token");

      const { address: ownerAddress } = parsed;

      if (hotspot.gain === undefined || hotspot.elevation === undefined) return;

      const [lng, lat] = coords;

      const txn = await Location.createLocationTxn({
        gateway: hotspot.address,
        lat,
        lng,
        decimalGain: hotspot.gain / 10,
        elevation: hotspot.elevation,
        dataOnly: hotspot.mode === "dataonly",
        owner: ownerAddress,
        currentLocation: hotspot.location,
        makerAddress: onboardingRecord.maker.address,
        locationNonceLimit: onboardingRecord.maker.locationNonceLimit || 0,
      });

      setUpdateTxn(txn);
    };

    createUpdateTxn();
  }, [walletToken, coords, onboardingRecord, hotspot]);

  const submitTxn = useCallback(async () => {
    if (!walletToken || !updateTxn) return;

    const url = WalletLink.createUpdateHotspotUrl({
      token: walletToken,
      assertLocationTxn: updateTxn.toString(),
    });

    if (!url) {
      Toast.showWithGravity(
        t("hotspotOnboarding.txnProgressScreen.linkCreationError"),
        Toast.LONG,
        Toast.CENTER,
      );
      return;
    }

    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Toast.showWithGravity(t("generic.openLinkError", { url }), Toast.LONG, Toast.CENTER);
    }
  }, [t, walletToken, updateTxn]);

  const navNext = useCallback(async () => {
    try {
      submitTxn();
    } catch (error) {
      let titleKey = "generic.error";
      let messageKey = "generice.somethingWentWrong";

      if (isString(error)) {
        if (error === HotspotErrorCode.WAIT) {
          messageKey = t("hotspotOnboarding.txnProgressScreen.waitErrorBody");
          titleKey = t("hotspotOnboarding.txnProgressScreen.waitErrorTitle");
        } else {
          messageKey = `Got error code ${error}`;
        }
      }

      await showOKAlert({ titleKey, messageKey });
    }
  }, [t, submitTxn, showOKAlert]);

  if (!feeData) return <ActivityIndicatorCentered />;

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
            {t("confirmLocationUpdateScreen.title")}
          </Text>

          <Text variant="subtitle1" marginBottom="s" textAlign="center">
            {t(
              feeData.isFree
                ? "hotspot_setup.location_fee.subtitle_free"
                : "hotspot_setup.location_fee.subtitle_fee",
            )}
          </Text>

          <Text
            variant="subtitle1"
            marginBottom={{ phone: "m", smallPhone: "ms" }}
            numberOfLines={2}
            adjustsFontSizeToFit
            textAlign="center"
          >
            {t("hotspot_setup.location_fee.confirm_location")}
          </Text>

          <Box height={200} marginBottom={{ phone: "m", smallPhone: "ms" }}>
            <HotspotLocationPreview mapCenter={coords} locationName={locationName} />
          </Box>

          {!feeData.isFree && (
            <>
              <Box
                flexDirection="row"
                justifyContent="space-between"
                marginBottom={{ phone: "m", smallPhone: "ms" }}
              >
                <Text variant="body1" color="primaryText">
                  {t("hotspot_setup.location_fee.balance")}
                </Text>
                <Text
                  variant="body1"
                  color={feeData.hasSufficientBalance ? "primaryText" : "error"}
                >
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
                  {feeData.totalStakingAmount.toString(2)}
                </Text>
              </Box>

              {!feeData.hasSufficientBalance && (
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
          title={t("generic.submit")}
          color="primary"
          onPress={navNext}
          disabled={feeData.isFree ? false : !feeData.hasSufficientBalance}
        />
      </Box>
    </Box>
  );
};

export default ConfirmLocationUpdateScreen;
