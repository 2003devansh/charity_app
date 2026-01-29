import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "../AuthRedux/AuthSlice";
import volunteerTaskReducer from "../volenteerRedux/VolenteerSlice";

export const store = configureStore({
  reducer: {
    auth: AuthSlice,
    volunteerTasks: volunteerTaskReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
