/* eslint-disable  @typescript-eslint/no-explicit-any */

import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosClient } from "../../api/AxiosClient";

export const getAvailableTasks = createAsyncThunk(
  "volunteer/getAvailableTasks",
  async (_, toolkit) => {
    const response = await AxiosClient({
      url: "/volunteer/tasks",
      type: "GET",
      toolkit,
    });
    return response;
  }
);

export const acceptTask = createAsyncThunk(
  "volunteer/acceptTask",
  async (data: { donationId: string; volunteerId: string }, toolkit) => {
    const response = await AxiosClient({
      url: "/volunteer/tasks/accept",
      type: "POST",
      data,
      toolkit,
    });
    return response;
  }
);

export const getMyTasks = createAsyncThunk(
  "volunteer/getMyTasks",
  async (volunteerId: string, toolkit) => {
    const response = await AxiosClient({
      url: "/volunteer/tasks/my",
      type: "GET",
      data: { volunteerId },
      toolkit,
    });
    return response;
  }
);

export const updateTaskStatus = createAsyncThunk(
  "volunteer/updateTaskStatus",
  async ({ taskId, status }: { taskId: string; status: string }, toolkit) => {
    const response = await AxiosClient({
      url: `/volunteer/tasks/${taskId}`,
      type: "PATCH",
      data: { status },
      toolkit,
    });
    return response;
  }
);
