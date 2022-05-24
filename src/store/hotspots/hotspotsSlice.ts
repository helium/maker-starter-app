import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Hotspot } from '@helium/http'
import { getHotspots } from '../../utils/appDataClient'
import { LocationCoords } from '../../utils/location'
import {
  CacheRecord,
  handleCacheFulfilled,
  hasValidCache,
} from '../../utils/cacheUtils'
import { HotspotSyncStatus } from '../../features/hotspots/root/hotspotTypes'

export type HotspotsSliceState = {
  hotspots: CacheRecord<{ data: Hotspot[] }>
  orderedHotspots: Hotspot[]
  location?: LocationCoords
  hotspotsLoaded: boolean
  failure: boolean
  syncStatuses: Record<string, CacheRecord<{ status: HotspotSyncStatus }>>
}

const initialState: HotspotsSliceState = {
  hotspots: { lastFetchedTimestamp: 0, loading: false, data: [] },
  orderedHotspots: [],
  hotspotsLoaded: false,
  failure: true,
  syncStatuses: {},
}

export const fetchHotspotsData = createAsyncThunk(
  'hotspots/fetchHotspotsData',
  async (_arg, { getState }) => {
    const state = ((await getState()) as { hotspots: HotspotsSliceState })
      .hotspots
    if (hasValidCache(state.hotspots)) {
      return {
        hotspots: state.hotspots.data,
      }
    }
    const allHotspots = await Promise.all([getHotspots()])

    const [hotspots = []]: [Hotspot[]] = allHotspots as [Hotspot[]]

    return {
      hotspots,
    }
  },
)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const hotspotsSliceMigrations: any = {
  0: () => initialState, // migration for hotspots and followedHotspots moving to CacheRecord
}

const hotspotsSlice = createSlice({
  name: 'hotspots',
  initialState,
  reducers: {
    signOut: () => {
      return { ...initialState }
    },
    refresh: () => {
      return { ...initialState }
    },
    updateSyncStatus: (
      state,
      {
        payload: { address, status },
      }: { payload: { address: string; status: HotspotSyncStatus } },
    ) => {
      state.syncStatuses[address] = handleCacheFulfilled({
        status,
      })
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchHotspotsData.fulfilled, (state, action) => {
      state.hotspots = handleCacheFulfilled({ data: action.payload.hotspots })
      state.hotspotsLoaded = true
      state.failure = false
      console.log('here we are not')
    })
    builder.addCase(fetchHotspotsData.rejected, (state, _action) => {
      console.log('here we are')
      state.hotspotsLoaded = true
      state.failure = true
    })
  },
})

export default hotspotsSlice
