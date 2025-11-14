/* eslint-disable  @typescript-eslint/no-explicit-any */

import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosClient } from "../../api/AxiosClient";

export const getAvailableDonations = createAsyncThunk(
  "recipient/getAvailableDonations",
  async (_, toolkit) => {
    const response = await AxiosClient({
      url: "/recipient/available",
      type: "GET",
      toolkit,
    });
    return response;
  }
);

export const claimDonation = createAsyncThunk(
  "recipient/claimDonation",
  async ({ id, recipientId }: { id: string; recipientId: string }, toolkit) => {
    const response = await AxiosClient({
      url: `/recipient/claim/${id}`,
      type: "PATCH",
      data: { recipientId },
      toolkit,
    });
    return response;
  }
);

export const getMyDonations = createAsyncThunk(
  "recipient/getMyDonations",
  async (recipientId: string, toolkit) => {
    const response = await AxiosClient({
      url: `/recipient/my-donations/${recipientId}`,
      type: "GET",
      toolkit,
    });
    return response;
  }
);
