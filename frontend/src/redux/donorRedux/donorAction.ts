/* eslint-disable @typescript-eslint/no-explicit-any */

import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosClient } from "../../api/AxiosClient";

/**
 * ----------------------------------------------------
 * GET ALL AVAILABLE DONATIONS (PUBLIC)
 * GET /donor
 * ----------------------------------------------------
 */
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

/**
 * ----------------------------------------------------
 * CREATE DONATION (AUTH REQUIRED)
 * POST /donor
 * ----------------------------------------------------
 */
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

/**
 * ----------------------------------------------------
 * GET DONATION BY ID (PUBLIC)
 * GET /donor/:id
 * ----------------------------------------------------
 */
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

/**
 * ----------------------------------------------------
 * UPDATE DONATION STATUS (OWNER ONLY)
 * PATCH /donor/:id
 * ----------------------------------------------------
 */
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

/**
 * ----------------------------------------------------
 * DELETE DONATION (OWNER ONLY)
 * DELETE /donor/:id
 * ----------------------------------------------------
 */
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

/**
 * ----------------------------------------------------
 * GET LOGGED-IN USER DONATIONS (AUTH REQUIRED)
 * GET /donor/me
 * ----------------------------------------------------
 */
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
