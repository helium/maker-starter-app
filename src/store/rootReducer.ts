import { combineReducers } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage'
import appSlice from './user/appSlice'
import locationSlice from './location/locationSlice'
import developerSlice from './developer/developerSlice'

const locationPersistConfig = {
  key: locationSlice.name,
  storage: AsyncStorage,
  whitelist: ['locations'],
}

const devPersistConfig = {
  key: developerSlice.name,
  storage: AsyncStorage,
}

const rootReducer = combineReducers({
  app: appSlice.reducer,
  [locationSlice.name]: persistReducer(
    locationPersistConfig,
    locationSlice.reducer,
  ),
  [developerSlice.name]: persistReducer(
    devPersistConfig,
    developerSlice.reducer,
  ),
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
