/* eslint-disable  @typescript-eslint/no-explicit-any */

import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  CreateDonations,
  DeleteDonations,
  getAllDonations,
  GetAllDonationsForLogedIn,
  getDonationaByID,
  UpdateDonations,
} from "./donorAction";

interface initialStateInterfaceForDonor {
  AllDonationData?: any;
  AllDonationLoader: boolean;
  AddDonationsData?: any;
  AddDonationsLoader: boolean;
  GetDonationByIdData?: any;
  GetDonationByIdLoader: boolean;
  UpdateDonationData?: any;
  UpdateDonationLoader: boolean;
  DeleteDonationLoader: boolean;
  DeleteDonationData?: any;
  LoggedInUserData?: any;
  LoggedInUserLoader: any;
}

const initialState: initialStateInterfaceForDonor = {
  AllDonationLoader: false,
  AddDonationsLoader: false,
  GetDonationByIdLoader: false,
  UpdateDonationLoader: false,
  DeleteDonationLoader: false,
  LoggedInUserLoader: false,
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
      })

      //  Slice for Creating a donations
      .addMatcher(isAnyOf(CreateDonations.pending), (state) => {
        state.AddDonationsLoader = true;
      })
      .addMatcher(isAnyOf(CreateDonations.fulfilled), (state, action) => {
        state.AddDonationsData = action.payload;
        state.AddDonationsLoader = false;
      })
      .addMatcher(isAnyOf(CreateDonations.rejected), (state) => {
        state.AddDonationsLoader = false;
      })

      //Slice for get Donation By Id
      .addMatcher(isAnyOf(getDonationaByID.rejected), (state) => {
        state.GetDonationByIdLoader = true;
      })
      .addMatcher(isAnyOf(getDonationaByID.fulfilled), (state, action) => {
        state.GetDonationByIdData = action.payload;
        state.GetDonationByIdLoader = false;
      })
      .addMatcher(isAnyOf(getDonationaByID.pending), (state) => {
        state.GetDonationByIdLoader = false;
      })

      // slice for Update donation
      .addMatcher(isAnyOf(UpdateDonations.rejected), (state) => {
        state.UpdateDonationLoader = true;
      })
      .addMatcher(isAnyOf(UpdateDonations.fulfilled), (state, action) => {
        state.UpdateDonationLoader = false;
        state.UpdateDonationData = action.payload;
      })
      .addMatcher(isAnyOf(UpdateDonations.pending), (state) => {
        state.UpdateDonationLoader = false;
      })

      // Slice for Delete donation
      .addMatcher(isAnyOf(DeleteDonations.pending), (state) => {
        state.DeleteDonationLoader = true;
      })
      .addMatcher(isAnyOf(DeleteDonations.fulfilled), (state, action) => {
        state.DeleteDonationData = action.payload;
        state.DeleteDonationLoader = false;
      })
      .addMatcher(isAnyOf(DeleteDonations.rejected), (state) => {
        state.DeleteDonationLoader = false;
      })

      //Slice for Logged-in user
      .addMatcher(isAnyOf(GetAllDonationsForLogedIn.pending), (state) => {
        state.LoggedInUserLoader = true;
      })
      .addMatcher(
        isAnyOf(GetAllDonationsForLogedIn.fulfilled),
        (state, action) => {
          state.LoggedInUserLoader = false;
          state.LoggedInUserData = action.payload;
        }
      )
      .addMatcher(isAnyOf(GetAllDonationsForLogedIn.rejected), (state) => {
        state.LoggedInUserLoader = false;
      });
  },
});
