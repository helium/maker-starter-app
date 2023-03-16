import { Hotspot as HeliumHotspot } from '@helium/http'
import { Asset } from '@helium/spl-utils'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Hotspot } from '../../features/hotspots/root/hotspotTypes'

export type State = { loadingHotspots: boolean; hotspots?: Hotspot[] }
const initialState: State = { loadingHotspots: true }

const getHotspotAddress = (item: Asset | HeliumHotspot): string => {
  const asset = item as Asset
  if (asset?.content?.json_uri) {
    return asset.content.json_uri.split('/').slice(-1)[0]
  }

  const hotspot = item as HeliumHotspot
  return hotspot.address
}

export const fetchHotspots = createAsyncThunk<
  Hotspot[],
  {
    fetcher: (opts: {
      heliumAddress: string
    }) => Promise<Asset[] | HeliumHotspot[] | undefined>
    heliumAddress: string
    isSolana: boolean
  }
>('hotspot/fetchHotspots', async ({ fetcher, heliumAddress, isSolana }) => {
  const results: HeliumHotspot[] | Asset[] | undefined = await fetcher({
    heliumAddress,
  })

  const hotspots: Hotspot[] = []
  if (!results) return hotspots

  return results.map((h) => {
    if (isSolana) {
      return { address: getHotspotAddress(h) }
    }
    const hotspot = h as HeliumHotspot
    return {
      address: hotspot.address,
      lat: hotspot.lat,
      lng: hotspot.lng,
      location: hotspot.location,
    }
  })
})

const hotspotSlice = createSlice({
  name: 'hotspot',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchHotspots.pending, (state) => {
      state.loadingHotspots = true
    })
    builder.addCase(fetchHotspots.rejected, (state) => {
      state.loadingHotspots = false
    })
    builder.addCase(fetchHotspots.fulfilled, (state, { payload }) => {
      state.hotspots = payload
      state.loadingHotspots = false
    })
  },
})

export default hotspotSlice
