/* eslint-disable  @typescript-eslint/no-explicit-any */

import type { AxiosRequestConfig } from "axios";
import axios from "axios";

export interface AxiosClientInterfaceParams extends AxiosRequestConfig {
  url: string;
  type?: "GET" | "POST" | "PATCH" | "DELETE";
  data?: any;
  params?: any;
  toolkit?: any;
}

export const AxiosClient = async ({
  url,
  type = "GET",
  data,
  params,
  toolkit,
}: AxiosClientInterfaceParams) => {
  try {
    const response = await axios({
      baseURL: "http://localhost:4000",
      url,
      method: type,
      data,
      params,
    });

    return response.data;
  } catch (error: any) {
    console.error("API Error:", error?.response?.data || error.message);
    return toolkit?.rejectWithValue(error?.response?.data || error.message);
  }
};
