import { combineReducers } from '@reduxjs/toolkit'
import appSlice from './user/appSlice'
import locationSlice from './location/locationSlice'

const rootReducer = combineReducers({
  app: appSlice.reducer,
  location: locationSlice.reducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
