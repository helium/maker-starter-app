import { combineReducers } from '@reduxjs/toolkit'
import { createMigrate, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage'
// import accountSlice from './account/accountSlice'
import appSlice from './user/appSlice'
// import connectedHotspotSlice from './connectedHotspot/connectedHotspotSlice'
// import heliumDataSlice from './helium/heliumDataSlice'
// import heliumStatusSlice from './helium/heliumStatusSlice'
// import hotspotDetailsSlice from './hotspotDetails/hotspotDetailsSlice'
import hotspotsSlice, {
  hotspotsSliceMigrations,
} from './hotspots/hotspotsSlice'
import locationSlice from './location/locationSlice'

const hotspotsConfig = {
  key: hotspotsSlice.name,
  storage: AsyncStorage,
  blacklist: ['rewards'],
  version: 0,
  migrate: createMigrate(hotspotsSliceMigrations, { debug: false }),
}

const rootReducer = combineReducers({
  app: appSlice.reducer,

  hotspots: persistReducer(hotspotsConfig, hotspotsSlice.reducer),
  location: locationSlice.reducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
