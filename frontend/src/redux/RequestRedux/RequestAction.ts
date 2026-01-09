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
      url: "",
      type: "POST",
      data,
      toolkit,
    });
    return response;
  }
);
