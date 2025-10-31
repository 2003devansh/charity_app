import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosClient } from "../../api/AxiosClient";

export const registerAuth = createAsyncThunk(
  "register",
  async (data, toolkit) => {
    const response = await AxiosClient({
      url: "/register",
      type: "POST",
      data,
      toolkit,
    });
    return response;
  }
);

export const loginAuth = createAsyncThunk("login", async (data, toolkit) => {
  const response = await AxiosClient({
    url: "/login",
    type: "POST",
    data,
    toolkit,
  });
  return response;
});
