import * as Location from 'expo-location'

export const checkLocationPermissions = async (): Promise<boolean> => {
  const { status } = await Location.requestForegroundPermissionsAsync()
  return status === 'granted'
}
