/* eslint-disable  @typescript-eslint/no-explicit-any */

import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  getAvailableDonations,
  claimDonation,
  getMyDonations,
} from "./RecipientAction";

interface RecipientState {
  availableDonations: any[];
  myDonations: any[];
  loading: boolean;
}

const initialState: RecipientState = {
  availableDonations: [],
  myDonations: [],
  loading: false,
};

export const RecipientSlice = createSlice({
  name: "recipient",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        isAnyOf(
          getAvailableDonations.pending,
          claimDonation.pending,
          getMyDonations.pending
        ),
        (state) => {
          state.loading = true;
        }
      )
      .addMatcher(isAnyOf(getAvailableDonations.fulfilled), (state, action) => {
        state.availableDonations = action.payload.data || [];
        state.loading = false;
      })
      .addMatcher(isAnyOf(claimDonation.fulfilled), (state) => {
        state.loading = false;
      })
      .addMatcher(isAnyOf(getMyDonations.fulfilled), (state, action) => {
        state.myDonations = action.payload.donations || [];
        state.loading = false;
      })
      .addMatcher(
        isAnyOf(
          getAvailableDonations.rejected,
          claimDonation.rejected,
          getMyDonations.rejected
        ),
        (state) => {
          state.loading = false;
        }
      );
  },
});
