/* eslint-disable  @typescript-eslint/no-explicit-any */

import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosClient } from "../../api/AxiosClient";

export const getUserNotifications = createAsyncThunk(
  "notification/getUserNotifications",
  async (userId: string, toolkit) => {
    const response = await AxiosClient({
      url: `/notifications/${userId}`,
      type: "GET",
      toolkit,
    });
    return response;
  }
);

export const markAsRead = createAsyncThunk(
  "notification/markAsRead",
  async (id: string, toolkit) => {
    const response = await AxiosClient({
      url: `/notifications/${id}/read`,
      type: "PATCH",
      toolkit,
    });
    return response;
  }
);

export const deleteNotification = createAsyncThunk(
  "notification/deleteNotification",
  async (id: string, toolkit) => {
    const response = await AxiosClient({
      url: `/notifications/${id}`,
      type: "DELETE",
      toolkit,
    });
    return response;
  }
);

export const clearAllNotifications = createAsyncThunk(
  "notification/clearAllNotifications",
  async (userId: string, toolkit) => {
    const response = await AxiosClient({
      url: `/notifications/clear/${userId}`,
      type: "DELETE",
      toolkit,
    });
    return response;
  }
);
