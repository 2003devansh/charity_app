/* eslint-disable  @typescript-eslint/no-explicit-any */

import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  getAvailableTasks,
  acceptTask,
  getMyTasks,
  updateTaskStatus,
} from "./VolunteerAction";

interface VolunteerState {
  availableTasks: any[];
  myTasks: any[];
  loading: boolean;
}

const initialState: VolunteerState = {
  availableTasks: [],
  myTasks: [],
  loading: false,
};

export const VolunteerSlice = createSlice({
  name: "volunteer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        isAnyOf(
          getAvailableTasks.pending,
          acceptTask.pending,
          getMyTasks.pending,
          updateTaskStatus.pending
        ),
        (state) => {
          state.loading = true;
        }
      )
      .addMatcher(isAnyOf(getAvailableTasks.fulfilled), (state, action) => {
        state.availableTasks = action.payload.data || [];
        state.loading = false;
      })
      .addMatcher(isAnyOf(acceptTask.fulfilled), (state) => {
        state.loading = false;
      })
      .addMatcher(isAnyOf(getMyTasks.fulfilled), (state, action) => {
        state.myTasks = action.payload.tasks || [];
        state.loading = false;
      })
      .addMatcher(isAnyOf(updateTaskStatus.fulfilled), (state) => {
        state.loading = false;
      })
      .addMatcher(
        isAnyOf(
          getAvailableTasks.rejected,
          acceptTask.rejected,
          getMyTasks.rejected,
          updateTaskStatus.rejected
        ),
        (state) => {
          state.loading = false;
        }
      );
  },
});
