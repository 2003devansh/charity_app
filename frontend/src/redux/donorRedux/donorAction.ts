/* eslint-disable @typescript-eslint/no-explicit-any */

import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosClient } from "../../api/AxiosClient";

export const getAllDonations = createAsyncThunk(
  "donations/getAllAvailable",
  async (_: void, toolkit) => {
    const response = await AxiosClient({
      url: "/donor",
      type: "GET",
      toolkit,
    });
    return response;
  }
);

export const createDonation = createAsyncThunk(
  "donations/create",
  async (
    data: {
      title: string;
      description: string;
      category: string;
      quantity: number;
    },
    toolkit
  ) => {
    const response = await AxiosClient({
      url: "/donor",
      type: "POST",
      data,
      toolkit,
    });
    return response;
  }
);

export const getDonationById = createAsyncThunk(
  "donations/getById",
  async (id: string, toolkit) => {
    const response = await AxiosClient({
      url: `/donor/${id}`,
      type: "GET",
      toolkit,
    });
    return response;
  }
);

export const updateDonationStatus = createAsyncThunk(
  "donations/updateStatus",
  async (
    data: {
      id: string;
      status: "AVAILABLE" | "CLAIMED" | "DELIVERED";
    },
    toolkit
  ) => {
    const response = await AxiosClient({
      url: `/donor/${data.id}`,
      type: "PATCH",
      data: { status: data.status },
      toolkit,
    });
    return response;
  }
);

export const deleteDonation = createAsyncThunk(
  "donations/delete",
  async (id: string, toolkit) => {
    const response = await AxiosClient({
      url: `/donor/${id}`,
      type: "DELETE",
      toolkit,
    });
    return response;
  }
);

export const getMyDonations = createAsyncThunk(
  "donations/getMine",
  async (_: void, toolkit) => {
    const response = await AxiosClient({
      url: "/donor/me",
      type: "GET",
      toolkit,
    });
    return response;
  }
);
