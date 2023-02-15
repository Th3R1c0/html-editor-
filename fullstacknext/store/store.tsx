import { configureStore } from "@reduxjs/toolkit";
import settingsReducer from "../slices/userSlice";

export function makeStore() {
  return configureStore({
    reducer: {
      settings: settingsReducer
    },
  });
}

export const store = makeStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;