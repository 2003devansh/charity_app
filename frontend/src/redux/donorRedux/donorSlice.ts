/* eslint-disable @typescript-eslint/no-explicit-any */

import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  getAllDonations,
  createDonation,
  getDonationById,
  updateDonationStatus,
  deleteDonation,
  getMyDonations,
} from "./donorAction";

interface DonorState {
  availableDonations?: any;
  availableDonationsLoading: boolean;

  myDonations?: any;
  myDonationsLoading: boolean;

  donationById?: any;
  donationByIdLoading: boolean;

  createDonationLoading: boolean;
  updateDonationLoading: boolean;
  deleteDonationLoading: boolean;
}

const initialState: DonorState = {
  availableDonationsLoading: false,
  myDonationsLoading: false,
  donationByIdLoading: false,
  createDonationLoading: false,
  updateDonationLoading: false,
  deleteDonationLoading: false,
};

export const donorSlice = createSlice({
  name: "donor",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      /**
       * ----------------------------------
       * GET ALL AVAILABLE DONATIONS
       * ----------------------------------
       */
      .addMatcher(isAnyOf(getAllDonations.pending), (state) => {
        state.availableDonationsLoading = true;
      })
      .addMatcher(isAnyOf(getAllDonations.fulfilled), (state, action) => {
        state.availableDonationsLoading = false;
        state.availableDonations = action.payload;
      })
      .addMatcher(isAnyOf(getAllDonations.rejected), (state) => {
        state.availableDonationsLoading = false;
      })

      /**
       * ----------------------------------
       * GET MY DONATIONS (LOGGED IN USER)
       * ----------------------------------
       */
      .addMatcher(isAnyOf(getMyDonations.pending), (state) => {
        state.myDonationsLoading = true;
      })
      .addMatcher(isAnyOf(getMyDonations.fulfilled), (state, action) => {
        state.myDonationsLoading = false;
        state.myDonations = action.payload;
      })
      .addMatcher(isAnyOf(getMyDonations.rejected), (state) => {
        state.myDonationsLoading = false;
      })

      /**
       * ----------------------------------
       * GET DONATION BY ID
       * ----------------------------------
       */
      .addMatcher(isAnyOf(getDonationById.pending), (state) => {
        state.donationByIdLoading = true;
      })
      .addMatcher(isAnyOf(getDonationById.fulfilled), (state, action) => {
        state.donationByIdLoading = false;
        state.donationById = action.payload;
      })
      .addMatcher(isAnyOf(getDonationById.rejected), (state) => {
        state.donationByIdLoading = false;
      })

      /**
       * ----------------------------------
       * CREATE DONATION
       * ----------------------------------
       */
      .addMatcher(isAnyOf(createDonation.pending), (state) => {
        state.createDonationLoading = true;
      })
      .addMatcher(isAnyOf(createDonation.fulfilled), (state) => {
        state.createDonationLoading = false;
      })
      .addMatcher(isAnyOf(createDonation.rejected), (state) => {
        state.createDonationLoading = false;
      })

      /**
       * ----------------------------------
       * UPDATE DONATION STATUS
       * ----------------------------------
       */
      .addMatcher(isAnyOf(updateDonationStatus.pending), (state) => {
        state.updateDonationLoading = true;
      })
      .addMatcher(isAnyOf(updateDonationStatus.fulfilled), (state) => {
        state.updateDonationLoading = false;
      })
      .addMatcher(isAnyOf(updateDonationStatus.rejected), (state) => {
        state.updateDonationLoading = false;
      })

      /**
       * ----------------------------------
       * DELETE DONATION
       * ----------------------------------
       */
      .addMatcher(isAnyOf(deleteDonation.pending), (state) => {
        state.deleteDonationLoading = true;
      })
      .addMatcher(isAnyOf(deleteDonation.fulfilled), (state) => {
        state.deleteDonationLoading = false;
      })
      .addMatcher(isAnyOf(deleteDonation.rejected), (state) => {
        state.deleteDonationLoading = false;
      });
  },
});

export default donorSlice.reducer;
