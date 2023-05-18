import { combineReducers } from '@reduxjs/toolkit'
import { enableMapSet } from 'immer'
import appSlice from './user/appSlice'
import hotspotsSlice from './hotspots/hotspotsSlice'
import heliumDataSlice from './helium/heliumDataSlice'
import locationSlice from './location/locationSlice'

enableMapSet()

const rootReducer = combineReducers({
  app: appSlice.reducer,
  location: locationSlice.reducer,
  heliumData: heliumDataSlice.reducer,
  hotspots: hotspotsSlice.reducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
