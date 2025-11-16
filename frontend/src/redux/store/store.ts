import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "../AuthRedux/AuthSlice";

export const store = configureStore({
  reducer: {
    auth: AuthSlice, // ← register your slice here
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
