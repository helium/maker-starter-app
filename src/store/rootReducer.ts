import { combineReducers } from "@reduxjs/toolkit";

import { heliumApi } from "./helium/heliumApi";
import appSlice from "./user/appSlice";

const rootReducer = combineReducers({
  app: appSlice.reducer,
  [heliumApi.reducerPath]: heliumApi.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
