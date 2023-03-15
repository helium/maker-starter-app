import { combineReducers } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage'
import appSlice from './user/appSlice'
import locationSlice from './location/locationSlice'

const locationPersistConfig = {
  key: locationSlice.name,
  storage: AsyncStorage,
  whitelist: ['locations'],
}

const rootReducer = combineReducers({
  app: appSlice.reducer,
  [locationSlice.name]: persistReducer(
    locationPersistConfig,
    locationSlice.reducer,
  ),
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
