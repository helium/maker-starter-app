import React from "react";
import { useTranslation } from "react-i18next";

import Text from "./Text";

const WalletNotLinkedError = () => {
  const { t } = useTranslation();

  return (
    <Text variant="body2" color="error" textAlign="center">
      {t("walletNotLinkedError")}
    </Text>
  );
};

export default WalletNotLinkedError;
