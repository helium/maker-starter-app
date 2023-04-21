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
    async (showAlert = true) => {
      if (showAlert) {
        const decision = await showOKCancelAlert({
          titleKey: 'permissions.location.title',
          messageKey: 'permissions.location.message',
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
