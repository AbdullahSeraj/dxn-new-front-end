import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import snackbarReducer from "../slices/SnackbarSlice";
import ViewDateilsReducer from "../slices/ViewDetailsSlice";
import TotalReducer from "../slices/TotalSlice";
import SettingsReducer from "../slices/SettingsSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    snackbar: snackbarReducer,
    dateils: ViewDateilsReducer,
    total: TotalReducer,
    settings: SettingsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: import.meta.env.VITE_NODE_ENV === "development",
});

setupListeners(store.dispatch);
