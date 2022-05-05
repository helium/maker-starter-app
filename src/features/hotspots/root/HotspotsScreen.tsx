import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import Config from "react-native-config";
import Toast from "react-native-simple-toast";
import { FlatList, Linking } from "react-native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import CarotRight from "assets/images/carot-right.svg";
import { DebouncedButton } from "components/Button";
import Text from "components/Text";
import WalletNotLinkedError from "components/WalletNotLinkedError";
import Box from "components/Box";
import TouchableOpacityBox from "components/TouchableOpacityBox";
import { ActivityIndicatorCentered } from "components/ActivityIndicator";
import { useGetHostspotsQuery } from "store/helium/heliumApi";
import { useColors } from "theme/themeHooks";
import { SignedInStackNavigationProp } from "navigation/navigationRootTypes";
import { RootState } from "store/rootReducer";

const HotspotsScreen = () => {
  const { t } = useTranslation();

  const { walletAddress, walletToken } = useSelector((state: RootState) => state.app);

  const openOnboardingSite = useCallback(async () => {
    if (!walletAddress) return;

    const url = Config.ONBOARD_URL.replace(/WALLET/, walletAddress);

    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Toast.showWithGravity(t("generic.openLinkError", { url }), Toast.LONG, Toast.CENTER);
    }
  }, [t, walletAddress]);

  return (
    <Box flex={1} backgroundColor="primaryBackground" paddingHorizontal="m" paddingBottom="s">
      <Text variant="h2" textAlign="center" marginBottom="m">
        {t("hotspotsScreen.title")}
      </Text>

      <Box flex={1} marginBottom="s">
        {walletAddress && <HotspotsList walletAddress={walletAddress} />}
      </Box>

      {!walletToken && <WalletNotLinkedError />}

      <DebouncedButton
        title={t("hotspotsScreen.addBtn")}
        disabled={!walletToken}
        onPress={openOnboardingSite}
        color="primary"
      />
    </Box>
  );
};

type HotspotsListProps = {
  walletAddress: string;
};

const HotspotsList = ({ walletAddress }: HotspotsListProps) => {
  const { t } = useTranslation();
  const colors = useColors();

  const navigation = useNavigation<SignedInStackNavigationProp>();

  const { data: hotspots, isLoading } = useGetHostspotsQuery(
    walletAddress,
    { pollingInterval: 60000 }, // refresh every minute
  );

  if (isLoading) return <ActivityIndicatorCentered />;

  if (!hotspots?.length)
    return (
      <Text variant="body1" textAlign="center">
        {t("hotspotsScreen.noItems")}
      </Text>
    );

  const openHotspotDetails = (hotspotAddress: string) => {
    if (!walletAddress || !hotspotAddress) return;

    navigation.push("HotspotDetails", { hotspotAddress });
  };

  return (
    <FlatList
      data={hotspots}
      renderItem={({ item }) => {
        return (
          <TouchableOpacityBox
            backgroundColor="secondaryBackground"
            borderRadius="l"
            flexDirection="row"
            marginBottom="s"
            onPress={() => openHotspotDetails(item.address)}
          >
            <Box flex={1} paddingVertical="m" paddingLeft="m">
              <Text variant="body1" textTransform="capitalize" fontWeight="bold" marginBottom="xs">
                {item.name}
              </Text>

              <Text variant="body2" marginBottom="xs">
                {item.locationName || t("hotspotsScreen.locationNotSet")}
              </Text>

              <Text variant="body2" textTransform="capitalize">
                {item.isLocationSet && item.status}
              </Text>
            </Box>

            <Box width={60} justifyContent="center" alignItems="center">
              <CarotRight color={colors.boneBlack} />
            </Box>
          </TouchableOpacityBox>
        );
      }}
    />
  );
};

export default HotspotsScreen;
