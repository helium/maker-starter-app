import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { HotspotMeta, Asset } from '@helium/react-native-sdk'
import { Hotspot } from '@helium/http'

type OnboardingObject = Record<string, any>

export type HotspotsSliceState = {
  hotspots: Hotspot[] | Asset[]
  hotspotsLoaded: boolean
  hotspotDetails: Map<string, HotspotMeta>
  onboardingCache: Map<string, OnboardingObject>
}

const initialState: HotspotsSliceState = {
  hotspots: [],
  hotspotsLoaded: false,
  hotspotDetails: new Map<string, HotspotMeta>(),
  onboardingCache: new Map<string, OnboardingObject>(),
}

const hotspotsSlice = createSlice({
  name: 'hotspots',
  initialState,
  reducers: {
    updateHotspots: (state, action: PayloadAction<Hotspot[] | Asset[]>) => {
      state.hotspotsLoaded = true
      state.hotspots = action.payload
    },
    updateHotspotDetail: (
      state,
      action: PayloadAction<{ address: string; hotspotDetail: HotspotMeta }>,
    ) => {
      state.hotspotDetails.set(
        action.payload.address,
        action.payload.hotspotDetail,
      )
    },
    dropHotspotCache: (state) => {
      state.hotspots = []
      state.hotspotsLoaded = false
      state.hotspotDetails.clear()
      state.onboardingCache.clear()
    },
    updateOnboardingCache: (
      state,
      action: PayloadAction<{
        address: string
        onboardingRecord: OnboardingObject
      }>,
    ) => {
      state.onboardingCache.set(
        action.payload.address,
        action.payload.onboardingRecord,
      )
    },
  },
})

export const {
  updateHotspots,
  updateHotspotDetail,
  updateOnboardingCache,
  dropHotspotCache,
} = hotspotsSlice.actions
export default hotspotsSlice
