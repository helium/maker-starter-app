import { useCallback, useState } from "react";
import * as Location from "expo-location";
import { useTranslation } from "react-i18next";

import useAlert from "./useAlert";

const useCheckLocationPermission = () => {
  const { showOKAlert } = useAlert();
  const { t } = useTranslation();

  const [, requestPermissionExpo] = Location.useForegroundPermissions();
  const [isRequesting, setIsRequesting] = useState(false);

  const requestPermission = useCallback(async (): Promise<boolean> => {
    setIsRequesting(true);
    const { status } = await requestPermissionExpo();
    setIsRequesting(false);

    const isGranted = status === "granted";

    if (!isGranted) {
      await showOKAlert({
        titleKey: t("checkLocationPermission.error.title"),
        messageKey: t("checkLocationPermission.error.message"),
      });
    }

    return isGranted;
  }, [setIsRequesting, requestPermissionExpo, showOKAlert, t]);

  return { isRequestingPermission: isRequesting, requestPermission };
};

export default useCheckLocationPermission;
