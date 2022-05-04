import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  deleteSecureItem,
  getSecureItem,
  setSecureItem,
  getWalletAddress,
  setWalletAddress,
  getWalletToken,
  setWalletToken,
  signOut,
} from "../../utils/secureAccount";
import { Intervals } from "../../features/settings/useAuthIntervals";

export type AppState = {
  isRestored: boolean;
  isPinRequired: boolean;
  authInterval: number;
  lastIdle: number | null;
  isLocked: boolean;
  walletAddress?: string;
  walletToken?: string;
};
const initialState: AppState = {
  isRestored: false,
  isPinRequired: false,
  authInterval: Intervals.IMMEDIATELY,
  lastIdle: null,
  isLocked: false,
};

type Restore = {
  isBackedUp: boolean;
  isPinRequired: boolean;
  authInterval: number;
  isLocked: boolean;
  walletAddress?: string;
  walletToken?: string;
};

export const restoreAppSettings = createAsyncThunk<Restore>("app/restoreAppSettings", async () => {
  const [isPinRequired, authInterval, walletAddress, walletToken] = await Promise.all([
    getSecureItem("requirePin"),
    getSecureItem("authInterval"),
    getWalletAddress(),
    getWalletToken(),
  ]);
  return {
    isPinRequired,
    authInterval: authInterval ? parseInt(authInterval, 10) : Intervals.IMMEDIATELY,
    isLocked: isPinRequired,
    walletAddress,
    walletToken,
  } as Restore;
});

// This slice contains data related to the state of the app
const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    backupAccount: (state, action: PayloadAction<string>) => {
      setSecureItem("requirePin", true);
      setSecureItem("userPin", action.payload);
      state.isPinRequired = true;
    },
    signOut: () => {
      signOut();
      return { ...initialState, isRestored: true };
    },
    updateAuthInterval: (state, action: PayloadAction<number>) => {
      state.authInterval = action.payload;
      setSecureItem("authInterval", action.payload.toString());
    },
    disablePin: (state) => {
      deleteSecureItem("requirePin");
      deleteSecureItem("userPin");
      state.isPinRequired = false;
    },
    updateLastIdle: (state) => {
      state.lastIdle = Date.now();
    },
    storeWalletInfo: (
      state,
      { payload: { address, token } }: PayloadAction<{ address: string; token?: string }>,
    ) => {
      state.walletAddress = address;
      setWalletAddress(address);
      if (token) {
        state.walletToken = token;
        setWalletToken(token);
      }
    },
    lock: (state, action: PayloadAction<boolean>) => {
      state.isLocked = action.payload;
      if (!state.isLocked) {
        state.lastIdle = null;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(restoreAppSettings.fulfilled, (state, { payload }) => {
      return { ...state, ...payload, isRestored: true };
    });
  },
});

export default appSlice;
