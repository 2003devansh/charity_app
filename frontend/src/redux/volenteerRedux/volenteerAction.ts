/* eslint-disable @typescript-eslint/no-explicit-any */

import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosClient } from "../../api/AxiosClient";

export const getAvailableTasks = createAsyncThunk(
  "tasks/getAvailable",
  async (_: void, toolkit) => {
    return AxiosClient({
      url: "/tasks/available",
      type: "GET",
      toolkit,
    });
  }
);

export const acceptTask = createAsyncThunk(
  "tasks/accept",
  async (
    data: {
      donationId: string;
    },
    toolkit
  ) => {
    return AxiosClient({
      url: "/tasks/accept",
      type: "POST",
      data,
      toolkit,
    });
  }
);

export const getMyTasks = createAsyncThunk(
  "tasks/getMine",
  async (_: void, toolkit) => {
    return AxiosClient({
      url: "/tasks/me",
      type: "GET",
      toolkit,
    });
  }
);

export const updateTaskStatus = createAsyncThunk(
  "tasks/updateStatus",
  async (
    data: {
      taskId: string;
      status: "PENDING" | "COMPLETED";
    },
    toolkit
  ) => {
    return AxiosClient({
      url: `/tasks/${data.taskId}`,
      type: "PATCH",
      data: { status: data.status },
      toolkit,
    });
  }
);
