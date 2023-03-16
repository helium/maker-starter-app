import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Cluster } from '@solana/web3.js'

const SENTINEL_BASE_URL = 'https://solana-status.helium.com'
export type SolanaStatus = 'not_started' | 'in_progress' | 'complete'

export type State = {
  enabled: boolean
  status: SolanaStatus
  forceSolana: boolean
  cluster: Cluster
}
const initialState: State = {
  enabled: false,
  status: 'complete',
  forceSolana: false,
  cluster: 'mainnet-beta',
}

export const getStatus = createAsyncThunk('developer/getStatus', async () => {
  let migrationStatus: SolanaStatus = 'complete'

  try {
    const response = (await (await fetch(SENTINEL_BASE_URL)).json()) as {
      migrationStatus: SolanaStatus
    }

    if (response?.migrationStatus) {
      migrationStatus = response.migrationStatus
    }
  } catch {}

  return migrationStatus
})

const developerSlice = createSlice({
  name: 'developer',
  initialState,
  reducers: {
    toggleDeveloperPermission: (state) => {
      const enabled = !state.enabled
      state.enabled = enabled
      if (!enabled) {
        state.forceSolana = false
        state.cluster = 'mainnet-beta'
      }
    },
    toggleForceSolana: (state) => {
      state.forceSolana = !state.forceSolana
    },
    changeCluster: (state, { payload }) => {
      state.cluster = payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getStatus.fulfilled, (state, { payload }) => {
      state.status = payload
    })
  },
})

export default developerSlice
