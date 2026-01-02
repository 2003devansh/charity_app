/* eslint-disable  @typescript-eslint/no-explicit-any */

import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosClient } from "../../api/AxiosClient";

// Get all available donations
export const getAllDonations = createAsyncThunk(
  "GET_ALL_DONATIONS",
  async (data: any, toolkit) => {
    const response = await AxiosClient({
      url: "/donor",
      type: "GET",
      data,
      toolkit,
    });
    return response;
  }
);

//  Create a donation
export const CreateDonations = createAsyncThunk(
  "CREATE_DONATIONS",
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

// get All donation By ID
export const getDonationaByID = createAsyncThunk(
  "GET_ALL_DONATION_BY_ID",
  async (data: any, toolkit) => {
    const response = await AxiosClient({
      url: "/donor/:id",
      type: "GET",
      toolkit,
      data,
    });
    return response;
  }
);

// Update donations
export const UpdateDonations = createAsyncThunk(
  "UPDATE_DONATIONS",
  async (data: any, toolkit) => {
    const response = await AxiosClient({
      url: "/donor/:id",
      type: "PATCH",
      toolkit,
      data,
    });

    return response;
  }
);

// delete donations (only the owner of the donations will be able to delete them )
export const DeleteDonations = createAsyncThunk(
  "DELETE_DONATIONS",
  async (data: any, toolkit) => {
    const response = await AxiosClient({
      url: "/donor/:id",
      type: "DELETE",
      data,
      toolkit,
    });

    return response;
  }
);

// Get All the donations of logedIn User
export const GetAllDonationsForLogedIn = createAsyncThunk(
  "GET_ALL_DONATIONS_FOR_LOGGED_IN_USER",
  async (data: any, toolkit) => {
    const response = await AxiosClient({
      url: "/donor/getAllDonation",
      type: "GET",
      data,
      toolkit,
    });
    return response;
  }
);
