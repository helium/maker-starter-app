import { Hotspot as HeliumHotspot } from '@helium/http'
import { HotspotType } from '@helium/onboarding'
import { HotspotMeta } from '@helium/react-native-sdk'
import { Asset } from '@helium/spl-utils'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import animalName from 'angry-purple-tiger'
import {
  Hotspot,
  HotspotDetail,
} from '../../features/hotspots/root/hotspotTypes'

export type State = {
  loadingHotspots: boolean
  hotspots?: Hotspot[]
  hotspotDetails: Record<string, HotspotDetail>
}
const initialState: State = { loadingHotspots: true, hotspotDetails: {} }

const getHotspotAddress = (item: Asset | HeliumHotspot): string => {
  const asset = item as Asset
  if (asset?.content?.json_uri) {
    return asset.content.json_uri.split('/').slice(-1)[0]
  }

  const hotspot = item as HeliumHotspot
  return hotspot.address
}

export const fetchHotspots = createAsyncThunk<
  (Hotspot & HotspotDetail)[],
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

  const hotspots: (Hotspot & HotspotDetail)[] = []
  if (!results) return hotspots

  return results.map((h) => {
    if (isSolana) {
      const address: string = getHotspotAddress(h)
      return { address, animalName: animalName(address) }
    }
    const hotspot = h as HeliumHotspot
    return {
      address: hotspot.address,
      animalName: animalName(hotspot.address),
      lat: hotspot.lat,
      lng: hotspot.lng,
      location: hotspot.location,
      elevation: hotspot.elevation,
      gain: hotspot.gain,
    }
  })
})

const hotspotSlice = createSlice({
  name: 'hotspot',
  initialState,
  reducers: {
    updateHotspotDetails: (
      state,
      {
        payload,
      }: {
        payload: HotspotMeta & { networkTypes: HotspotType[]; address: string }
      },
    ) => {
      const { address, ...rest } = payload
      state.hotspotDetails[address] = rest
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchHotspots.pending, (state) => {
      state.loadingHotspots = true
    })
    builder.addCase(fetchHotspots.rejected, (state) => {
      state.loadingHotspots = false
    })
    builder.addCase(fetchHotspots.fulfilled, (state, { payload, meta }) => {
      state.hotspots = payload

      if (!meta.arg.isSolana) {
        payload.forEach((details) => {
          state.hotspotDetails[details.address] = details
        })
      }
      state.loadingHotspots = false
    })
  },
})

export default hotspotSlice
