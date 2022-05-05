import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import appSlice from "store/user/appSlice";
import { useAppDispatch } from "store/store";
import ConfirmPinView from "components/ConfirmPinView";
import { SignedInStackParamList } from "navigation/navigationRootTypes";
import { MainTabNavigationProp } from "navigation/main/mainTabNavigatorTypes";
import Box from "components/Box";

type Route = RouteProp<SignedInStackParamList, "ConfirmPinScreen">;

const ConfirmPinScreen = () => {
  const dispatch = useAppDispatch();
  const route = useRoute<Route>();
  const navigation = useNavigation<MainTabNavigationProp>();
  const { pin: originalPin, pinReset } = route.params;
  const { t } = useTranslation();

  const pinSuccess = useCallback(
    (pin: string) => {
      dispatch(appSlice.actions.backupAccount(pin));
      if (pinReset) {
        // TODO: Handle pin reset complete
        navigation.navigate("Settings");
      }
    },
    [pinReset, dispatch, navigation],
  );

  return (
    <Box flex={1} backgroundColor="primaryBackground" paddingHorizontal="m">
      <ConfirmPinView
        originalPin={originalPin}
        title={t("pinManagement.confirmPin.title")}
        subtitle={t("pinManagement.confirmPin.subtitle")}
        pinSuccess={pinSuccess}
        onCancel={navigation.goBack}
      />
    </Box>
  );
};

export default ConfirmPinScreen;
