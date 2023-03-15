import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as Location from 'expo-location'
import { reverseGeocodeAsync, LocationGeocodedAddress } from 'expo-location'
import { getCurrentPosition, LocationCoords } from '../../utils/location'

export type State = {
  currentLocation?: LocationCoords
  isLoadingLocation: boolean
  permissionResponse?: Location.LocationPermissionResponse
  locationBlocked: boolean
  locations: Record<string, LocationGeocodedAddress>
}
const initialState: State = {
  isLoadingLocation: false,
  locationBlocked: false,
  locations: {},
}

export const getGeocodedAddress = createAsyncThunk<
  {
    geocodedAddress?: LocationGeocodedAddress
  },
  { lat?: number; lng?: number; location?: string }
>(
  'location/getGeocodedAddress',
  async ({ lat, lng, location: hotspotLocation }, { getState }) => {
    const { location } = (await getState()) as { location: State }

    let geocodedAddress: LocationGeocodedAddress | undefined = hotspotLocation
      ? location.locations[hotspotLocation]
      : undefined

    if (!geocodedAddress && hotspotLocation && lat && lng) {
      try {
        const info = await reverseGeocodeAsync({
          latitude: lat,
          longitude: lng,
        })
        if (info.length) {
          ;[geocodedAddress] = info
        }
      } catch {}
    }
    return { geocodedAddress }
  },
)

export const getLocation = createAsyncThunk(
  'location/getLocation',
  async (_, { dispatch }) => {
    let pos: LocationCoords | null = null
    try {
      pos = await getCurrentPosition()
    } catch (e) {}
    dispatch(getLocationPermission())
    return pos
  },
)

export const getLocationPermission = createAsyncThunk(
  'location/getLocationPermission',
  Location.getForegroundPermissionsAsync,
)

export const hasLocationPermission = (
  status?: Location.LocationPermissionResponse,
) => status?.granted

// This slice contains data related to the state of the app
const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    updateLocationPermission: (
      state,
      {
        payload: permissionResponse,
      }: { payload: Location.LocationPermissionResponse },
    ) => {
      state.permissionResponse = permissionResponse
      state.locationBlocked =
        permissionResponse &&
        !permissionResponse.granted &&
        !permissionResponse.canAskAgain
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getLocation.pending, (state) => {
      state.isLoadingLocation = true
    })
    builder.addCase(getLocation.rejected, (state) => {
      state.isLoadingLocation = false
    })
    builder.addCase(getLocation.fulfilled, (state, { payload }) => {
      if (payload) {
        state.currentLocation = payload
      }
      state.isLoadingLocation = false
    })
    builder.addCase(
      getLocationPermission.fulfilled,
      (state, { payload: permissionResponse }) => {
        state.permissionResponse = permissionResponse
        state.locationBlocked =
          permissionResponse &&
          !permissionResponse.granted &&
          !permissionResponse.canAskAgain
      },
    )
    builder.addCase(
      getGeocodedAddress.fulfilled,
      (state, { payload, meta }) => {
        if (meta.arg.location && payload.geocodedAddress) {
          state.locations[meta.arg.location] = payload.geocodedAddress
        }
      },
    )
  },
})

export default locationSlice
