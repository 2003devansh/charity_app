/* eslint-disable  @typescript-eslint/no-explicit-any */

import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  createDonation,
  getAllDonations,
  getDonationById,
  updateDonation,
  deleteDonation,
} from "./DonorAction";

interface DonorState {
  donations: any[];
  currentDonation: any;
  loading: boolean;
  createLoading: boolean;
}

const initialState: DonorState = {
  donations: [],
  currentDonation: null,
  loading: false,
  createLoading: false,
};

export const DonorSlice = createSlice({
  name: "donor",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(isAnyOf(createDonation.pending), (state) => {
        state.createLoading = true;
      })
      .addMatcher(isAnyOf(createDonation.fulfilled), (state) => {
        state.createLoading = false;
      })
      .addMatcher(isAnyOf(createDonation.rejected), (state) => {
        state.createLoading = false;
      })
      .addMatcher(isAnyOf(getAllDonations.pending), (state) => {
        state.loading = true;
      })
      .addMatcher(isAnyOf(getAllDonations.fulfilled), (state, action) => {
        state.donations = action.payload.data || [];
        state.loading = false;
      })
      .addMatcher(isAnyOf(getAllDonations.rejected), (state) => {
        state.loading = false;
      })
      .addMatcher(isAnyOf(getDonationById.pending), (state) => {
        state.loading = true;
      })
      .addMatcher(isAnyOf(getDonationById.fulfilled), (state, action) => {
        state.currentDonation = action.payload.data;
        state.loading = false;
      })
      .addMatcher(isAnyOf(getDonationById.rejected), (state) => {
        state.loading = false;
      })
      .addMatcher(isAnyOf(updateDonation.pending, deleteDonation.pending), (state) => {
        state.loading = true;
      })
      .addMatcher(isAnyOf(updateDonation.fulfilled, deleteDonation.fulfilled), (state) => {
        state.loading = false;
      })
      .addMatcher(isAnyOf(updateDonation.rejected, deleteDonation.rejected), (state) => {
        state.loading = false;
      });
  },
});
