import { configureStore } from "@reduxjs/toolkit";
import { AuthSlice } from "./AuthRedux/AuthSlice";
import { DonorSlice } from "./DonorRedux/DonorSlice";
import { RecipientSlice } from "./RecipientRedux/RecipientSlice";
import { VolunteerSlice } from "./VolunteerRedux/VolunteerSlice";
import { RequestSlice } from "./RequestRedux/RequestSlice";
import { NotificationSlice } from "./NotificationRedux/NotificationSlice";

export const store = configureStore({
  reducer: {
    auth: AuthSlice.reducer,
    donor: DonorSlice.reducer,
    recipient: RecipientSlice.reducer,
    volunteer: VolunteerSlice.reducer,
    request: RequestSlice.reducer,
    notification: NotificationSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
