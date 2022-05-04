import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { RouteProp, useRoute } from "@react-navigation/native";
import { Location, HotspotErrorCode, WalletLink } from "@helium/react-native-sdk";
import { AssertLocationV2 } from "@helium/transactions";
import { isString } from "lodash";
import { useSelector } from "react-redux";
import Toast from "react-native-simple-toast";
import { Linking } from "react-native";
import { Balance, CurrencyType } from "@helium/currency";

import { RootState } from "../../../store/rootReducer";
import useAlert from "../../../utils/useAlert";
import Box from "../../../components/Box";
import { DebouncedButton } from "../../../components/Button";
import Text from "../../../components/Text";
import { SignedInStackParamList } from "../../../navigation/navigationRootTypes";
import { ActivityIndicatorCentered } from "../../../components/ActivityIndicator";
import { decimalSeparator, groupSeparator } from "../../../i18n";

type Route = RouteProp<SignedInStackParamList, "ConfirmAntennaUpdateScreen">;

const ConfirmAntennaUpdateScreen = () => {
  const { t } = useTranslation();
  const { showOKAlert } = useAlert();
  const { walletToken } = useSelector((state: RootState) => state.app);
  const {
    params: { hotspot, onboardingRecord, antenna, gain, elevation },
  } = useRoute<Route>();

  const [updateTxn, setUpdateTxn] = useState<AssertLocationV2>();
  useEffect(() => {
    const createUpdateTxn = async () => {
      if (!walletToken) return;

      const parsed = WalletLink.parseWalletLinkToken(walletToken);
      if (!parsed?.address) throw new Error("Invalid Token");

      const { address: ownerAddress } = parsed;

      if (hotspot.lat === undefined || hotspot.lng === undefined) return;

      const txn = await Location.createLocationTxn({
        gateway: hotspot.address,
        lat: hotspot.lat,
        lng: hotspot.lng,
        decimalGain: gain,
        elevation,
        dataOnly: hotspot.mode === "dataonly",
        owner: ownerAddress,
        currentLocation: hotspot.location,
        makerAddress: onboardingRecord.maker.address,
        locationNonceLimit: onboardingRecord.maker.locationNonceLimit || 0,
      });

      setUpdateTxn(txn);
    };

    createUpdateTxn();
  }, [walletToken, onboardingRecord, hotspot, gain, elevation]);

  const feeString: string = useMemo(() => {
    if (updateTxn?.fee === undefined) return "";

    const feeDc = new Balance(updateTxn.fee, CurrencyType.dataCredit);
    return feeDc.toString(0, {
      groupSeparator,
      decimalSeparator,
    });
  }, [updateTxn]);

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

  const handlerSubmitPress = useCallback(async () => {
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

  if (!updateTxn) return <ActivityIndicatorCentered />;

  return (
    <Box flex={1} backgroundColor="primaryBackground" paddingHorizontal="m" paddingBottom="l">
      <Box flex={1} paddingBottom="m">
        <Text
          variant="h2"
          numberOfLines={1}
          adjustsFontSizeToFit
          marginBottom="l"
          textAlign="center"
        >
          {t("confirmAntennaUpdateScreen.title")}
        </Text>

        <Box flexDirection="row" justifyContent="space-between" marginTop="l">
          <Text variant="body1" fontWeight="bold">
            {t("confirmAntennaUpdateScreen.antennaLabel")}
          </Text>

          <Text variant="body1" fontWeight="bold">
            {antenna.name}
          </Text>
        </Box>

        <Box flexDirection="row" justifyContent="space-between" marginTop="l">
          <Text variant="body1" fontWeight="bold">
            {t("hotspot_setup.location_fee.gain_label")}
          </Text>

          <Text variant="body1" fontWeight="bold">
            {t("hotspot_setup.location_fee.gain", { gain })}
          </Text>
        </Box>

        <Box flexDirection="row" justifyContent="space-between" marginTop="l">
          <Text variant="body1" fontWeight="bold">
            {t("hotspot_setup.location_fee.elevation_label")}
          </Text>

          <Text variant="body1" fontWeight="bold">
            {t("hotspot_setup.location_fee.elevation", { count: elevation })}
          </Text>
        </Box>

        <Box flexDirection="row" justifyContent="space-between" marginTop="l">
          <Text variant="body1" fontWeight="bold">
            {t("hotspot_setup.location_fee.fee")}
          </Text>

          <Text variant="body1" fontWeight="bold">
            {feeString}
          </Text>
        </Box>
      </Box>

      <DebouncedButton title={t("generic.submit")} color="primary" onPress={handlerSubmitPress} />
    </Box>
  );
};

export default ConfirmAntennaUpdateScreen;
