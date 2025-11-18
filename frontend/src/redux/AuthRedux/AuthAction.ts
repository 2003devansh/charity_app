/* eslint-disable  @typescript-eslint/no-explicit-any */

import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosClient } from "../../api/AxiosClient";

export const registerAuth = createAsyncThunk(
  "register",
  async (data: any, toolkit) => {
    const response = await AxiosClient({
      url: "/auth/register",
      type: "POST",
      data,
      toolkit,
    });
    return response;
  }
);

export const loginAuth = createAsyncThunk(
  "login",
  async (data: any, toolkit) => {
    const response = await AxiosClient({
      url: "/auth/login",
      type: "POST",
      data,
      toolkit,
    });
    return response;
  }
);
