import { useTranslation } from "react-i18next";

import { useColors } from "theme/themeHooks";

const useDefaultScreenOptions = () => {
  const { t } = useTranslation();
  const colors = useColors();

  return {
    headerStyle: {
      backgroundColor: colors.primaryBackground,
      elevation: 0, // remove shadow on Android
      shadowOpacity: 0, // remove shadow on iOS
    },
    headerTintColor: colors.primaryText,
    headerBackTitle: t("generic.back"),
  };
};

export default useDefaultScreenOptions;
