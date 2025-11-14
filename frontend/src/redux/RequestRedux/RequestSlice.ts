/* eslint-disable  @typescript-eslint/no-explicit-any */

import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  createRequest,
  getMyRequests,
  getRequestById,
  updateRequest,
  deleteRequest,
} from "./RequestAction";

interface RequestState {
  requests: any[];
  currentRequest: any;
  loading: boolean;
  createLoading: boolean;
}

const initialState: RequestState = {
  requests: [],
  currentRequest: null,
  loading: false,
  createLoading: false,
};

export const RequestSlice = createSlice({
  name: "request",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(isAnyOf(createRequest.pending), (state) => {
        state.createLoading = true;
      })
      .addMatcher(isAnyOf(createRequest.fulfilled), (state) => {
        state.createLoading = false;
      })
      .addMatcher(isAnyOf(createRequest.rejected), (state) => {
        state.createLoading = false;
      })
      .addMatcher(isAnyOf(getMyRequests.pending), (state) => {
        state.loading = true;
      })
      .addMatcher(isAnyOf(getMyRequests.fulfilled), (state, action) => {
        state.requests = action.payload.requests || [];
        state.loading = false;
      })
      .addMatcher(isAnyOf(getMyRequests.rejected), (state) => {
        state.loading = false;
      })
      .addMatcher(isAnyOf(getRequestById.pending), (state) => {
        state.loading = true;
      })
      .addMatcher(isAnyOf(getRequestById.fulfilled), (state, action) => {
        state.currentRequest = action.payload.data;
        state.loading = false;
      })
      .addMatcher(isAnyOf(getRequestById.rejected), (state) => {
        state.loading = false;
      })
      .addMatcher(isAnyOf(updateRequest.pending, deleteRequest.pending), (state) => {
        state.loading = true;
      })
      .addMatcher(isAnyOf(updateRequest.fulfilled, deleteRequest.fulfilled), (state) => {
        state.loading = false;
      })
      .addMatcher(isAnyOf(updateRequest.rejected, deleteRequest.rejected), (state) => {
        state.loading = false;
      });
  },
});
