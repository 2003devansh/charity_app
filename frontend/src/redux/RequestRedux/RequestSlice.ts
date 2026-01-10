/* eslint-disable @typescript-eslint/no-explicit-any */

import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  createRequest,
  getMyRequests,
  getRequestById,
  updateRequest,
  deleteRequest,
} from "./RequestAction";

interface RequestState {
  // Logged-in user's requests
  myRequests?: any;
  myRequestsLoading: boolean;

  // Single request (details page)
  requestById?: any;
  requestByIdLoading: boolean;

  // Action loaders
  createRequestLoading: boolean;
  updateRequestLoading: boolean;
  deleteRequestLoading: boolean;
}

const initialState: RequestState = {
  myRequestsLoading: false,
  requestByIdLoading: false,
  createRequestLoading: false,
  updateRequestLoading: false,
  deleteRequestLoading: false,
};

export const requestSlice = createSlice({
  name: "requests",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // slice for Create Request
      .addMatcher(isAnyOf(createRequest.pending), (state) => {
        state.createRequestLoading = true;
      })
      .addMatcher(isAnyOf(createRequest.fulfilled), (state) => {
        state.createRequestLoading = false;
      })
      .addMatcher(isAnyOf(createRequest.rejected), (state) => {
        state.createRequestLoading = false;
      })
      // Slice for Get my request
      .addMatcher(isAnyOf(getMyRequests.pending), (state) => {
        state.myRequestsLoading = true;
      })
      .addMatcher(isAnyOf(getMyRequests.fulfilled), (state, action) => {
        state.myRequestsLoading = false;
        state.myRequests = action.payload;
      })
      .addMatcher(isAnyOf(getMyRequests.rejected), (state) => {
        state.myRequestsLoading = false;
      })

      // slice for Get Request By Id
      .addMatcher(isAnyOf(getRequestById.pending), (state) => {
        state.requestByIdLoading = true;
      })
      .addMatcher(isAnyOf(getRequestById.fulfilled), (state, action) => {
        state.requestByIdLoading = false;
        state.requestById = action.payload;
      })
      .addMatcher(isAnyOf(getRequestById.rejected), (state) => {
        state.requestByIdLoading = false;
      })

      // Slice for update request
      .addMatcher(isAnyOf(updateRequest.pending), (state) => {
        state.updateRequestLoading = true;
      })
      .addMatcher(isAnyOf(updateRequest.fulfilled), (state) => {
        state.updateRequestLoading = false;
      })
      .addMatcher(isAnyOf(updateRequest.rejected), (state) => {
        state.updateRequestLoading = false;
      })

      // slice for delete Request
      .addMatcher(isAnyOf(deleteRequest.pending), (state) => {
        state.deleteRequestLoading = true;
      })
      .addMatcher(isAnyOf(deleteRequest.fulfilled), (state) => {
        state.deleteRequestLoading = false;
      })
      .addMatcher(isAnyOf(deleteRequest.rejected), (state) => {
        state.deleteRequestLoading = false;
      });
  },
});

export default requestSlice.reducer;
