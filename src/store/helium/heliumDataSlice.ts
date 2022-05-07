import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getMakers, Maker } from '../../utils/stakingClient'

export type HeliumDataState = {
  makers?: Maker[]
}
const initialState: HeliumDataState = {}

export const fetchInitialData = createAsyncThunk<HeliumDataState>(
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
    })
  },
})

export default heliumDataSlice
