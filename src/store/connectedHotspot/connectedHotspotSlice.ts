import { Hotspot } from '@helium/http'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getHotspotDetails } from '../../utils/appDataClient'
import {
  getOnboardingRecord,
  OnboardingRecord,
} from '../../utils/stakingClient'

export type HotspotStatus = 'owned' | 'global' | 'new' | 'error' | 'initial'

export type HotspotDetails = {
  mac?: string
  address?: string
  wifi?: string
  onboardingRecord?: OnboardingRecord
  onboardingAddress?: string
  firmware?: {
    version: string
    minVersion: string
  }
  ethernetOnline?: boolean
  status?: HotspotStatus
  details?: Hotspot
}

const initialState: HotspotDetails = {
  status: 'initial',
}

export type AllHotspotDetails = {
  hotspot?: Hotspot
  onboardingRecord?: OnboardingRecord
}
export const fetchConnectedHotspotDetails = createAsyncThunk<
  AllHotspotDetails,
  HotspotDetails
>('connectedHotspot/fetchConnectedHotspotDetails', async (details) => {
  if (!details.address) {
    throw new Error('fetchConnectedHotspotDetails address is missing')
  }
  if (!details.onboardingAddress) {
    throw new Error('fetchConnectedHotspotDetails onboardingAddress is missing')
  }

  const [hotspot, onboardingRecord] = await Promise.all([
    getHotspotDetails(details.address).catch(() => {
      // Hotspot may not yet exist on the chain, let it fail silently
    }),
    getOnboardingRecord(details.onboardingAddress),
  ])

  return {
    hotspot,
    onboardingRecord,
  } as AllHotspotDetails
})

// This slice contains data related to a connected hotspot
const connectedHotspotSlice = createSlice({
  name: 'connectedHotspot',
  initialState,
  reducers: {
    signOut: () => {
      return { ...initialState }
    },
    initConnectedHotspot: (state, action: PayloadAction<HotspotDetails>) => {
      Object.assign(state, action.payload)
      state.status = 'initial'
    },
    setConnectedHotspotWifi: (
      state,
      action: PayloadAction<string | undefined>,
    ) => {
      state.wifi = action.payload
    },
    setConnectedHotspotStatus: (
      state,
      action: PayloadAction<HotspotStatus>,
    ) => {
      state.status = action.payload
    },
    setConnectedHotspotFirmware: (
      state,
      action: PayloadAction<{
        version: string
        minVersion: string
      }>,
    ) => {
      state.firmware = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchConnectedHotspotDetails.fulfilled,
      (state, { payload }) => {
        state.onboardingRecord = payload.onboardingRecord
        state.details = payload.hotspot
      },
    )
    builder.addCase(fetchConnectedHotspotDetails.rejected, (state) => {
      state.details = undefined
    })
  },
})

export default connectedHotspotSlice
