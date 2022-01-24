import { combineReducers } from '@reduxjs/toolkit'
import appSlice from './user/appSlice'
import locationSlice from './location/locationSlice'
import { heliumApi } from './helium/heliumApi'

const rootReducer = combineReducers({
  app: appSlice.reducer,
  location: locationSlice.reducer,
  [heliumApi.reducerPath]: heliumApi.reducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
