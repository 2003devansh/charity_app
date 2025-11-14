/* eslint-disable  @typescript-eslint/no-explicit-any */

import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  getUserNotifications,
  markAsRead,
  deleteNotification,
  clearAllNotifications,
} from "./NotificationAction";

interface NotificationState {
  notifications: any[];
  loading: boolean;
  unreadCount: number;
}

const initialState: NotificationState = {
  notifications: [],
  loading: false,
  unreadCount: 0,
};

export const NotificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        isAnyOf(
          getUserNotifications.pending,
          markAsRead.pending,
          deleteNotification.pending,
          clearAllNotifications.pending
        ),
        (state) => {
          state.loading = true;
        }
      )
      .addMatcher(isAnyOf(getUserNotifications.fulfilled), (state, action) => {
        state.notifications = action.payload.notifications || [];
        state.unreadCount = state.notifications.filter((n: any) => !n.isRead).length;
        state.loading = false;
      })
      .addMatcher(
        isAnyOf(
          markAsRead.fulfilled,
          deleteNotification.fulfilled,
          clearAllNotifications.fulfilled
        ),
        (state) => {
          state.loading = false;
        }
      )
      .addMatcher(
        isAnyOf(
          getUserNotifications.rejected,
          markAsRead.rejected,
          deleteNotification.rejected,
          clearAllNotifications.rejected
        ),
        (state) => {
          state.loading = false;
        }
      );
  },
});
