import { configureStore, Action } from '@reduxjs/toolkit'
import { ThunkAction } from 'redux-thunk'
import { useDispatch, useStore } from 'react-redux'
import AsyncStorage from '@react-native-community/async-storage'
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import rootReducer, { RootState } from './rootReducer'
import locationSlice from './location/locationSlice'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [locationSlice.reducer.name],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        immutableCheck: false,
        // TODO: The BigNumber type in some models is not serializable. Ignoring the warning for now.
      },
    }),
})

export type AppDispatch = typeof store.dispatch
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>
export const useAppDispatch = () => useDispatch<AppDispatch>()
export type AppStore = typeof store
export const useAppStore = () => useStore<AppStore>()

export default store
