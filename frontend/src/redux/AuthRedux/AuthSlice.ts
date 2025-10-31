/* eslint-disable  @typescript-eslint/no-explicit-any */

import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { loginAuth, registerAuth } from "./AuthAction";

interface initialStateInterface {
  authRegisterData?: any;
  authRegisterLoader: boolean;
  authLoginData?: any;
  authLoginLoader: boolean;
}
const initialState: initialStateInterface = {
  authRegisterLoader: false,
  authLoginLoader: false,
};

export const AuthSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Register slice
      .addMatcher(isAnyOf(registerAuth.pending), (state) => {
        state.authRegisterLoader = true;
      })
      .addMatcher(isAnyOf(registerAuth.fulfilled), (state, action) => {
        state.authRegisterData = action.payload;
        state.authRegisterLoader = false;
      })
      .addMatcher(isAnyOf(registerAuth.rejected), (state) => {
        state.authRegisterLoader = false;
      })

      // slice for login
      .addMatcher(isAnyOf(loginAuth.pending), (state) => {
        state.authLoginLoader = true;
      })
      .addMatcher(isAnyOf(loginAuth.fulfilled), (state, action) => {
        state.authLoginData = action.payload;
        state.authLoginLoader = false;
      })
      .addMatcher(isAnyOf(loginAuth.rejected), (state) => {
        state.authLoginLoader = false;
      });
  },
});
