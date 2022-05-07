import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getMakers, Maker } from '../../utils/stakingClient'

export type HeliumDataState = {
  makers?: Maker[]
  makersLoaded: boolean
  failure: boolean
}
const initialState: HeliumDataState = {
  makersLoaded: false,
  failure: false,
}

export const fetchInitialData = createAsyncThunk(
  'heliumData/fetchInitialData',
  async () => {
    const makers = await getMakers()
    return {
      makers,
    }
  },
)

// This slice contains global helium data not specifically related to the current user
const heliumDataSlice = createSlice({
  name: 'heliumData',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchInitialData.fulfilled, (state, { payload }) => {
      state.makers = payload.makers
      state.makersLoaded = true
      state.failure = false
    })
    builder.addCase(fetchInitialData.rejected, (state) => {
      state.makersLoaded = true
      state.failure = true
    })
  },
})

export default heliumDataSlice
