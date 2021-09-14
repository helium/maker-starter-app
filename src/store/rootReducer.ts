import { combineReducers } from '@reduxjs/toolkit'
import accountSlice from './account/accountSlice'
import appSlice from './user/appSlice'
import heliumDataSlice from './helium/heliumDataSlice'
import locationSlice from './location/locationSlice'

const rootReducer = combineReducers({
  app: appSlice.reducer,
  account: accountSlice.reducer,
  heliumData: heliumDataSlice.reducer,
  location: locationSlice.reducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
