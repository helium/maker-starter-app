import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Account } from '@helium/http'
import { getAccount } from '../../utils/appDataClient'

type Loading = 'idle' | 'pending' | 'fulfilled' | 'rejected'

export type AccountState = {
  account?: Account
  fetchDataStatus: Loading
}

const initialState: AccountState = {
  fetchDataStatus: 'idle',
}

type AccountData = {
  account?: Account
}

export const fetchData = createAsyncThunk<AccountData>(
  'account/fetchData',
  async () => {
    const data = await getAccount()
    return {
      account: data,
    }
  },
)

// This slice contains data related to the user account
const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    signOut: () => {
      return { ...initialState }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state, _action) => {
      state.fetchDataStatus = 'pending'
    })
    builder.addCase(fetchData.fulfilled, (state, { payload }) => {
      state.fetchDataStatus = 'fulfilled'
      state.account = payload.account
    })
    builder.addCase(fetchData.rejected, (state, _action) => {
      state.fetchDataStatus = 'rejected'
    })
  },
})

export default accountSlice
