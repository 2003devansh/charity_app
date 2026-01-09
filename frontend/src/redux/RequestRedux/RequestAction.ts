import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosClient } from "../../api/AxiosClient";

export const createRequest = createAsyncThunk(
  "request/create",
  async (
    data: {
      title: string;
      description: string;
      category: string;
    },
    toolkit
  ) => {
    const response = await AxiosClient({
      url: "/request",
      type: "POST",
      data,
      toolkit,
    });
    return response;
  }
);

export const getMyRequests = createAsyncThunk(
  "request/getMine",
  async (_: void, toolkit) => {
    const response = await AxiosClient({
      url: "/request/myrequests",
      type: "GET",
      toolkit,
    });
    return response;
  }
);
