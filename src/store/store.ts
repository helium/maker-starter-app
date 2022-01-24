import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useStore } from 'react-redux'
import rootReducer from './rootReducer'
import { heliumApi } from './helium/heliumApi'

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(heliumApi.middleware),
})

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export type AppStore = typeof store
export const useAppStore = () => useStore<AppStore>()

export default store
