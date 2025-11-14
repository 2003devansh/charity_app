/* eslint-disable  @typescript-eslint/no-explicit-any */

import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosClient } from "../../api/AxiosClient";

export const createRequest = createAsyncThunk(
  "request/createRequest",
  async (data: any, toolkit) => {
    const response = await AxiosClient({
      url: "/requests",
      type: "POST",
      data,
      toolkit,
    });
    return response;
  }
);

export const getMyRequests = createAsyncThunk(
  "request/getMyRequests",
  async (_, toolkit) => {
    const response = await AxiosClient({
      url: "/requests/myrequests",
      type: "GET",
      toolkit,
    });
    return response;
  }
);

export const getRequestById = createAsyncThunk(
  "request/getRequestById",
  async (id: string, toolkit) => {
    const response = await AxiosClient({
      url: `/requests/${id}`,
      type: "GET",
      toolkit,
    });
    return response;
  }
);

export const updateRequest = createAsyncThunk(
  "request/updateRequest",
  async ({ id, status }: { id: string; status: string }, toolkit) => {
    const response = await AxiosClient({
      url: `/requests/${id}`,
      type: "PATCH",
      data: { status },
      toolkit,
    });
    return response;
  }
);

export const deleteRequest = createAsyncThunk(
  "request/deleteRequest",
  async ({ id, recipientId }: { id: string; recipientId: string }, toolkit) => {
    const response = await AxiosClient({
      url: `/requests/${id}`,
      type: "DELETE",
      data: { recipientId },
      toolkit,
    });
    return response;
  }
);
