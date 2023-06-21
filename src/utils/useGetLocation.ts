import * as Location from 'expo-location'
import { useCallback, useEffect } from 'react'
import useAppState from 'react-native-appstate-hook'
import { useSelector } from 'react-redux'
import { Platform } from 'react-native'
import {
  getLocation,
  getLocationPermission,
} from '../store/location/locationSlice'
import { RootState } from '../store/rootReducer'
import { useAppDispatch } from '../store/store'
import { LocationCoords } from './location'
import usePermissionManager from './usePermissionManager'
import usePrevious from './usePrevious'

const isAndroid = Platform.OS === 'android'

const useGetLocation = () => {
  const { appState } = useAppState()
  const dispatch = useAppDispatch()
  const { requestLocationPermission } = usePermissionManager()
  const permissionResponse = useSelector(
    (state: RootState) => state.location.permissionResponse,
  )

  const prevAppState = usePrevious(appState)

  useEffect(() => {
    if (appState === 'active' && prevAppState === 'background') {
      // They might have gone to phone settings and changed the location permission
      dispatch(getLocationPermission())
    }
  }, [appState, dispatch, prevAppState])

  const dispatchGetLocation = useCallback(async () => {
    const { payload } = await dispatch(getLocation())
    return payload as LocationCoords | null
  }, [dispatch])

  const maybeGetLocation = useCallback(
    async (canPromptUser: boolean | 'skip', deniedHandler?: () => void) => {
      // We don't know if we can request location
      let permResponse = permissionResponse
      if (!permResponse) {
        const { payload } = await dispatch(getLocationPermission())
        permResponse = payload as Location.LocationPermissionResponse
      }
      if (!permResponse) return null // this shouldn't happen unless shit hits the fan

      if (permResponse.granted) {
        if (!isAndroid) {
          // incase of ios we don't need to check for fine location
          return dispatchGetLocation()
        }
        // check for fine for android
        if (permResponse?.android?.accuracy === 'fine') {
          return dispatchGetLocation()
        }
      }

      // prompt again as either we don't have permission or have coarse accuracy.
      if (canPromptUser !== false && permResponse.canAskAgain) {
        const response = await requestLocationPermission(
          canPromptUser !== 'skip',
          permResponse.granted,
        )

        if (response && response.granted) {
          return dispatchGetLocation()
        }
        deniedHandler?.()
        return null
      }
      return null
    },
    [
      permissionResponse,
      dispatch,
      dispatchGetLocation,
      requestLocationPermission,
    ],
  )
  return maybeGetLocation
}

export default useGetLocation
