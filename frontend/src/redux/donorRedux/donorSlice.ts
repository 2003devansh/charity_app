/* eslint-disable  @typescript-eslint/no-explicit-any */

import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { getAllDonations } from "./donorAction";

interface initialStateInterfaceForDonor {
  AllDonationData?: any;
  AllDonationLoader: boolean;
  AddDonationsData?: any;
  AddDonationsLoader: boolean;
}

const initialState: initialStateInterfaceForDonor = {
  AllDonationLoader: false,
  AddDonationsLoader: false,
};

export const DonorSlice = createSlice({
  name: "donorSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Slice for Get All donations
      .addMatcher(isAnyOf(getAllDonations.pending), (state) => {
        state.AllDonationLoader = true;
      })
      .addMatcher(isAnyOf(getAllDonations.fulfilled), (state, action) => {
        state.AllDonationData = action.payload;
        state.AllDonationLoader = false;
      })
      .addMatcher(isAnyOf(getAllDonations.rejected), (state) => {
        state.AllDonationLoader = false;
      });

    //  Slice for Creating a donations
  },
});
