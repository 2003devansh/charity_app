/* eslint-disable  @typescript-eslint/no-explicit-any */

import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosClient } from "../../api/AxiosClient";

export const createDonation = createAsyncThunk(
  "donor/createDonation",
  async (data: any, toolkit) => {
    const response = await AxiosClient({
      url: "/donor",
      type: "POST",
      data,
      toolkit,
    });
    return response;
  }
);

export const getAllDonations = createAsyncThunk(
  "donor/getAllDonations",
  async (_, toolkit) => {
    const response = await AxiosClient({
      url: "/donor",
      type: "GET",
      toolkit,
    });
    return response;
  }
);

export const getDonationById = createAsyncThunk(
  "donor/getDonationById",
  async (id: string, toolkit) => {
    const response = await AxiosClient({
      url: `/donor/${id}`,
      type: "GET",
      toolkit,
    });
    return response;
  }
);

export const updateDonation = createAsyncThunk(
  "donor/updateDonation",
  async ({ id, data }: { id: string; data: any }, toolkit) => {
    const response = await AxiosClient({
      url: `/donor/${id}`,
      type: "PATCH",
      data,
      toolkit,
    });
    return response;
  }
);

export const deleteDonation = createAsyncThunk(
  "donor/deleteDonation",
  async ({ id, donorId }: { id: string; donorId: string }, toolkit) => {
    const response = await AxiosClient({
      url: `/donor/${id}`,
      type: "DELETE",
      data: { donorId },
      toolkit,
    });
    return response;
  }
);
