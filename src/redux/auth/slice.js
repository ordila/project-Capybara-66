import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  userCurrent,
  userLogin,
  userLogout,
  userRefresh,
  userSignup,
} from "./operations";

const initialState = {
  user: {
    name: "",
    email: "",
    avatarUrl: "",
    currency: "",
  },
  accessToken: null,
  refreshToken: null,
  sid: null,
  isLoggedin: false,
  isRefresh: false,
  isLoading: false,
  error: null,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  selectors: {
    selectUse: (state) => state.user,
    selectIsLoggedin: (state) => state.isLoggedin,
    selectIsRefresh: (state) => state.isRefresh,
  },
  extraReducers: (builder) => {
    builder
      .addCase(userRefresh.fulfilled, (state, { payload }) => {
        state.accessToken = payload.accessToken;
        state.refreshToken = payload.refreshToken;
        state.sid = payload.sid;
        state.isLoggedin = true;
        state.isRefresh = false;
      })
      .addCase(userRefresh.pending, (state) => {
        state.isRefresh = true;
        state.error = null;
      })
      .addCase(userRefresh.rejected, (state) => {
        state.isRefresh = false;
      })
      .addCase(userCurrent.fulfilled, (state, { payload }) => {
        state.user.name = payload.name;
        state.user.email = payload.email;
        state.user.avatarUrl = payload.avatarUrl;
        state.user.currency = payload.currency;
      })
      .addCase(userLogout.fulfilled, (state) => {
        return initialState;
      })
      .addMatcher(
        isAnyOf(userLogin.fulfilled, userSignup.fulfilled),
        (state, { payload }) => {
          state.isLoggedin = true;
          state.isLoading = false;
          state.user.name = payload.user.name;
          state.user.email = payload.user.email;
          state.user.avatarUrl = payload.user.avatarUrl;
          state.user.currency = payload.user.currency;

          state.accessToken = payload.accessToken;
          state.refreshToken = payload.refreshToken;
          state.sid = payload.sid;
        }
      )
      .addMatcher(
        isAnyOf(
          userLogin.pending,
          userSignup.pending,
          userRefresh.pending,
          userCurrent.pending,
          userLogout.pending
        ),
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          userLogin.rejected,
          userSignup.rejected,
          userRefresh.rejected,
          userCurrent.rejected,
          userLogout.rejected
        ),
        (state, { payload }) => {
          state.isLoading = false;
          state.error = payload;
        }
      );
  },
});

export const AuthReducer = AuthSlice.reducer;
export const { selectUse, selectIsLoggedin, selectIsRefresh } =
  AuthSlice.selectors;
