import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type HotspotTransferState = {
  hotspotName?: string
  ownerAddress?: string
  newOwnerAddress?: string
  makerName?: string
}
const initialState: HotspotTransferState = {}

const hotspotTransferSlice = createSlice({
  name: 'hotspotTransfer',
  initialState,
  reducers: {
    setHotspotName(state, action: PayloadAction<string>) {
      state.hotspotName = action.payload
    },
    setOwnerAddress(state, action: PayloadAction<string>) {
      state.ownerAddress = action.payload
    },
    setNewOwnerAddress(state, action: PayloadAction<string>) {
      state.newOwnerAddress = action.payload
    },
    setMakerName(state, action: PayloadAction<string>) {
      state.makerName = action.payload
    },
    reset() {
      return initialState
    },
  },
})

export default hotspotTransferSlice
