import { Hotspot as HeliumHotspot } from '@helium/http'
import { HotspotType, OnboardingRecord } from '@helium/onboarding'
import { HotspotMeta } from '@helium/react-native-sdk'
import { Asset } from '@helium/spl-utils'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import animalName from 'angry-purple-tiger'
import { Cluster } from '@solana/web3.js'
import {
  Hotspot,
  HotspotDetail,
} from '../../features/hotspots/root/hotspotTypes'

type HotspotsForCluster = {
  hotspots?: Hotspot[]
  hotspotDetails: Record<string, HotspotDetail>
  onboardingRecords: Record<string, OnboardingRecord>
}
type HotspotsByCluster = Record<Cluster, HotspotsForCluster>

export type State = {
  loadingHotspots: boolean
  hotspotsByCluster: HotspotsByCluster
}

const initialHotspotState = {
  onboardingRecords: {} as Record<string, OnboardingRecord>,
  hotspotDetails: {} as Record<string, HotspotDetail>,
  hotspots: [] as Hotspot[],
}

const initialHotspotsState = {
  devnet: { ...initialHotspotState },
  testnet: { ...initialHotspotState },
  'mainnet-beta': {
    ...initialHotspotState,
  },
}

const initialState: State = {
  loadingHotspots: true,
  hotspotsByCluster: initialHotspotsState,
}

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
    cluster: Cluster
  }
>('hotspot/fetchHotspots', async ({ fetcher, heliumAddress }) => {
  const results: HeliumHotspot[] | Asset[] | undefined = await fetcher({
    heliumAddress,
  })

  const hotspots: (Hotspot & HotspotDetail)[] = []
  if (!results) return hotspots

  return results.map((h) => {
    const address: string = getHotspotAddress(h)
    return { address, animalName: animalName(address) }
  })
})

export const fetchOnboarding = createAsyncThunk<
  OnboardingRecord | null,
  {
    fetcher: (hotspotAddress: string) => Promise<OnboardingRecord | null>
    hotspotAddress: string
    cluster: Cluster
  }
>(
  'hotspot/fetchOnboarding',
  async ({ fetcher, hotspotAddress, cluster }, { getState }) => {
    const { hotspot } = (await getState()) as { hotspot: State }

    const prevRecord =
      hotspot.hotspotsByCluster[cluster].onboardingRecords[hotspotAddress]
    if (prevRecord) return prevRecord

    return fetcher(hotspotAddress)
  },
)

const hotspotSlice = createSlice({
  name: 'hotspot',
  initialState,
  reducers: {
    reset: (state) => {
      state.loadingHotspots = false
      state.hotspotsByCluster = initialHotspotsState
    },
    updateHotspotDetails: (
      state,
      {
        payload,
      }: {
        payload: HotspotMeta & {
          networkTypes: HotspotType[]
          address: string
          cluster: Cluster
        }
      },
    ) => {
      const { address, cluster, ...rest } = payload
      state.hotspotsByCluster[cluster].hotspotDetails[address] = rest
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
      state.hotspotsByCluster[meta.arg.cluster].hotspots = payload
      state.loadingHotspots = false
    })
    builder.addCase(fetchOnboarding.fulfilled, (state, { payload, meta }) => {
      if (!payload) return
      state.hotspotsByCluster[meta.arg.cluster].onboardingRecords[
        meta.arg.hotspotAddress
      ] = payload
    })
  },
})

export default hotspotSlice
