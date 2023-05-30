import * as Location from 'expo-location'
import { useCallback } from 'react'
import locationSlice from '../store/location/locationSlice'
import { useAppDispatch } from '../store/store'
import appSlice from '../store/user/appSlice'
import useAlert from './useAlert'

const usePermissionManager = () => {
  const { showOKCancelAlert } = useAlert()
  const dispatch = useAppDispatch()

  const requestLocationPermission = useCallback(
    async (showAlert = true, upgradeToPrecise = false) => {
      if (showAlert) {
        const decision = await showOKCancelAlert({
          titleKey: upgradeToPrecise
            ? 'permissions.upgrade_location.title'
            : 'permissions.location.title',
          messageKey: upgradeToPrecise
            ? 'permissions.upgrade_location.message'
            : 'permissions.location.message',
        })
        if (!decision) return false
      }
      dispatch(appSlice.actions.requestingPermission(true))
      const response = await Location.requestForegroundPermissionsAsync()
      dispatch(appSlice.actions.requestingPermission(false))

      dispatch(locationSlice.actions.updateLocationPermission(response))
      return response
    },
    [dispatch, showOKCancelAlert],
  )

  return { requestLocationPermission }
}
export default usePermissionManager
