import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  deleteSecureItem,
  getSecureItem,
  setSecureItem,
  signOut,
} from '../../utils/secureAccount'
import { Intervals } from '../../features/moreTab/more/useAuthIntervals'

export type AppState = {
  isSettingUpHotspot: boolean
  isRestored: boolean
  isPinRequired: boolean
  authInterval: number
  lastIdle: number | null
  isLocked: boolean
  isLoggedIn: boolean
  isRequestingPermission: boolean
  walletLinkToken?: string
  isOnboarded: boolean
}
const initialState: AppState = {
  isSettingUpHotspot: false,
  isRestored: false,
  isLoggedIn: false,
  isPinRequired: false,
  authInterval: Intervals.IMMEDIATELY,
  lastIdle: null,
  isLocked: false,
  isRequestingPermission: false,
  isOnboarded: false,
}

type Restore = {
  isBackedUp: boolean
  isPinRequired: boolean
  authInterval: number
  isLocked: boolean
  walletLinkToken?: string
  isLoggedIn: boolean
  isOnboarded: boolean
}

export const restoreAppSettings = createAsyncThunk<Restore>(
  'app/restoreAppSettings',
  async () => {
    const [
      isPinRequired,
      authInterval,
      walletLinkToken,
      mnemonic,
      isOnboarded,
    ] = await Promise.all([
      getSecureItem('requirePin'),
      getSecureItem('authInterval'),
      getSecureItem('walletLinkToken'),
      getSecureItem('mnemonic'),
      getSecureItem('isOnboarded'),
    ])
    return {
      isPinRequired,
      authInterval: authInterval
        ? parseInt(authInterval, 10)
        : Intervals.IMMEDIATELY,
      isLocked: isPinRequired,
      walletLinkToken,
      isLoggedIn: !!mnemonic || !!walletLinkToken,
      isOnboarded,
    } as Restore
  },
)

// This slice contains data related to the state of the app
const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    backupAccount: (state, action: PayloadAction<string>) => {
      setSecureItem('requirePin', true)
      setSecureItem('userPin', action.payload)
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
    setOnboarded: (state, action: PayloadAction<boolean>) => {
      state.isOnboarded = action.payload
      setSecureItem('isOnboarded', action.payload)
    },
    disablePin: (state) => {
      deleteSecureItem('requirePin')
      deleteSecureItem('userPin')
      state.isPinRequired = false
    },
    updateLastIdle: (state) => {
      state.lastIdle = Date.now()
    },
    storeWalletLinkToken: (
      state,
      { payload: token }: PayloadAction<string>,
    ) => {
      state.walletLinkToken = token
      state.isLoggedIn = true
      setSecureItem('walletLinkToken', token)
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
