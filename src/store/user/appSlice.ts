import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  deleteSecureItem,
  getSecureItem,
  setSecureItem,
  signOut,
} from '../../utils/secureAccount'
import { Intervals } from '../../features/moreTab/more/useAuthIntervals'

export type AppState = {
  isBackedUp: boolean
  isSettingUpHotspot: boolean
  isRestored: boolean
  isPinRequired: boolean
  authInterval: number
  lastIdle: number | null
  isLocked: boolean
  isRequestingPermission: boolean
}
const initialState: AppState = {
  isBackedUp: false,
  isSettingUpHotspot: false,
  isRestored: false,
  isPinRequired: false,
  authInterval: Intervals.IMMEDIATELY,
  lastIdle: null,
  isLocked: false,
  isRequestingPermission: false,
}

type Restore = {
  isBackedUp: boolean
  isPinRequired: boolean
  authInterval: number
  isLocked: boolean
}

export const restoreAppSettings = createAsyncThunk<Restore>(
  'app/restoreAppSettings',
  async () => {
    const [isBackedUp, isPinRequired, authInterval] = await Promise.all([
      getSecureItem('accountBackedUp'),
      getSecureItem('requirePin'),
      getSecureItem('authInterval'),
    ])
    return {
      isBackedUp,
      isPinRequired,
      authInterval: authInterval
        ? parseInt(authInterval, 10)
        : Intervals.IMMEDIATELY,
      isLocked: isPinRequired,
    } as Restore
  },
)

// This slice contains data related to the state of the app
const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    backupAccount: (state, action: PayloadAction<string>) => {
      setSecureItem('accountBackedUp', true)
      setSecureItem('requirePin', true)
      setSecureItem('userPin', action.payload)
      state.isBackedUp = true
      state.isPinRequired = true
    },
    startHotspotSetup: (state) => {
      state.isSettingUpHotspot = false
    },
    signOut: () => {
      signOut()
      return { ...initialState, isRestored: true }
    },
    updateAuthInterval: (state, action: PayloadAction<number>) => {
      state.authInterval = action.payload
      setSecureItem('authInterval', action.payload.toString())
    },
    disablePin: (state) => {
      deleteSecureItem('requirePin')
      deleteSecureItem('userPin')
      state.isPinRequired = false
    },
    updateLastIdle: (state) => {
      state.lastIdle = Date.now()
    },
    lock: (state, action: PayloadAction<boolean>) => {
      state.isLocked = action.payload
      if (!state.isLocked) {
        state.lastIdle = null
      }
    },
    requestingPermission: (state, action: PayloadAction<boolean>) => {
      state.isRequestingPermission = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(restoreAppSettings.fulfilled, (state, { payload }) => {
      return { ...state, ...payload, isRestored: true }
    })
  },
})

export default appSlice
