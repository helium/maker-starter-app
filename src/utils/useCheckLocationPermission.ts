import { useCallback, useState } from "react";

import { useForegroundPermissions } from "expo-location";
import { useTranslation } from "react-i18next";

import useAlert from "./useAlert";

const useCheckLocationPermission = () => {
  const { showOkAlert } = useAlert();
  const { t } = useTranslation();

  const [, requestPermissionExpo] = useForegroundPermissions();
  const [isRequesting, setIsRequesting] = useState(false);

  const requestPermission = useCallback(async (): Promise<boolean> => {
    setIsRequesting(true);
    const { status } = await requestPermissionExpo();
    setIsRequesting(false);

    const isGranted = status === "granted";

    if (!isGranted) {
      await showOkAlert({
        titleKey: t("checkLocationPermission.error.title"),
        messageKey: t("checkLocationPermission.error.message"),
      });
    }

    return isGranted;
  }, [setIsRequesting, requestPermissionExpo, showOkAlert, t]);

  return { isRequestingPermission: isRequesting, requestPermission };
};

export default useCheckLocationPermission;
