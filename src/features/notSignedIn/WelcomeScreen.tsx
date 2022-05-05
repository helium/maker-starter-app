import React, { useCallback, useMemo, useState } from "react";

import { useTranslation } from "react-i18next";
import { KeyboardAvoidingView } from "react-native";

import CarotRightIcon from "assets/images/carot-right.svg";
import LogoIcon from "assets/images/logo.svg";
import Box from "components/Box";
import { Button } from "components/Button";
import Text from "components/Text";
import TextInput from "components/TextInput";
import TouchableOpacityBox from "components/TouchableOpacityBox";
import { useAppDispatch } from "store/store";
import appSlice from "store/user/appSlice";
import { useColors } from "theme/themeHooks";
import useLinkWallet from "utils/useLinkWallet";

const WelcomeScreen = () => {
  const { t } = useTranslation();
  const colors = useColors();
  const dispatch = useAppDispatch();

  const [walletAddress, setWalletAddress] = useState<string>("");
  const isWalletAddressEmpty = useMemo(() => !walletAddress, [walletAddress]);

  const submitWalletAddress = useCallback(async () => {
    if (isWalletAddressEmpty) {
      return;
    }

    dispatch(
      appSlice.actions.storeWalletInfo({
        address: walletAddress,
      }),
    );
  }, [dispatch, isWalletAddressEmpty, walletAddress]);

  const linkWallet = useLinkWallet();

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <Box
        flex={1}
        backgroundColor="primaryBackground"
        paddingHorizontal="m"
        paddingBottom="l"
        alignItems="center"
      >
        <Box flex={1} justifyContent="center" alignItems="center">
          <LogoIcon height={80} width={80} />
          <Text variant="h1">{t("welcomeScreen.title")}</Text>
        </Box>
        <Button
          onPress={linkWallet}
          color="primary"
          fullWidth
          marginBottom="s"
          title={t("welcomeScreen.signIn")}
        />
        <Text variant="body2" textAlign="center" marginBottom="s">
          {t("welcomeScreen.or")}
        </Text>
        <Box flexDirection="row" marginBottom="m">
          <TextInput
            onChangeText={setWalletAddress}
            flex={4}
            padding="ms"
            placeholder={t("welcomeScreen.enterWallet")}
            autoCorrect={false}
            variant="regular"
            borderTopRightRadius="none"
            borderBottomRightRadius="none"
          />
          <TouchableOpacityBox
            onPress={submitWalletAddress}
            disabled={isWalletAddressEmpty}
            opacity={isWalletAddressEmpty ? 0.2 : 1}
            flex={1}
            justifyContent="center"
            alignItems="center"
            backgroundColor="primary"
            borderTopRightRadius="m"
            borderBottomRightRadius="m"
          >
            <CarotRightIcon height="20" width="20" color={colors.primaryText} />
          </TouchableOpacityBox>
        </Box>
      </Box>
    </KeyboardAvoidingView>
  );
};

export default WelcomeScreen;
