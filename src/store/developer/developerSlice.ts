import { createSlice } from '@reduxjs/toolkit'
import { Cluster } from '@solana/web3.js'

export type State = {
  cluster: Cluster
}
const initialState: State = {
  cluster: 'mainnet-beta',
}

const developerSlice = createSlice({
  name: 'developer',
  initialState,
  reducers: {
    changeCluster: (state, { payload }) => {
      state.cluster = payload
    },
  },
})

export default developerSlice
