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
  "request/UpdateRequest",
  async (
    data: {
      id: string;
      status: "OPEN" | "FULFILLED";
    },
    toolkit
  ) => {
    const response = await AxiosClient({
      url: `/requests/${data.id}`,
      type: "PATCH",
      data: { status: data.status },
      toolkit,
    });
    return response;
  }
);

export const deleteRequest = createAsyncThunk(
  "requests/delete",
  async (id: string, toolkit) => {
    const response = await AxiosClient({
      url: `/requests/${id}`,
      type: "DELETE",
      toolkit,
    });
    return response;
  }
);
