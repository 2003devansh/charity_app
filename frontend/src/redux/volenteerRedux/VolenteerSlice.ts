/* eslint-disable @typescript-eslint/no-explicit-any */

import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  getAvailableTasks,
  acceptTask,
  getMyTasks,
  updateTaskStatus,
} from "./volenteerAction";

interface VolunteerTaskState {
  availableTasks?: any;
  availableTasksLoading: boolean;

  myTasks?: any;
  myTasksLoading: boolean;

  acceptTaskLoading: boolean;
  updateTaskLoading: boolean;
}

const initialState: VolunteerTaskState = {
  availableTasksLoading: false,
  myTasksLoading: false,
  acceptTaskLoading: false,
  updateTaskLoading: false,
};

export const volunteerTaskSlice = createSlice({
  name: "volunteerTasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // slice for Available task
      .addMatcher(isAnyOf(getAvailableTasks.pending), (state) => {
        state.availableTasksLoading = true;
      })
      .addMatcher(isAnyOf(getAvailableTasks.fulfilled), (state, action) => {
        state.availableTasksLoading = false;
        state.availableTasks = action.payload;
      })
      .addMatcher(isAnyOf(getAvailableTasks.rejected), (state) => {
        state.availableTasksLoading = false;
      })
      // slice for accept task

      .addMatcher(isAnyOf(acceptTask.pending), (state) => {
        state.acceptTaskLoading = true;
      })
      .addMatcher(isAnyOf(acceptTask.fulfilled), (state) => {
        state.acceptTaskLoading = false;
      })
      .addMatcher(isAnyOf(acceptTask.rejected), (state) => {
        state.acceptTaskLoading = false;
      })

      // slice for Get my task

      .addMatcher(isAnyOf(getMyTasks.pending), (state) => {
        state.myTasksLoading = true;
      })
      .addMatcher(isAnyOf(getMyTasks.fulfilled), (state, action) => {
        state.myTasksLoading = false;
        state.myTasks = action.payload;
      })
      .addMatcher(isAnyOf(getMyTasks.rejected), (state) => {
        state.myTasksLoading = false;
      })
      // slice for Update
      .addMatcher(isAnyOf(updateTaskStatus.pending), (state) => {
        state.updateTaskLoading = true;
      })
      .addMatcher(isAnyOf(updateTaskStatus.fulfilled), (state) => {
        state.updateTaskLoading = false;
      })
      .addMatcher(isAnyOf(updateTaskStatus.rejected), (state) => {
        state.updateTaskLoading = false;
      });
  },
});

export default volunteerTaskSlice.reducer;
