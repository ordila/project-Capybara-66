import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { userCurrent, userLogin, userRefresh, userSignup } from "./operations";

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
  isRefresh: false,
  isLoading: false,
  error: null,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  selectors: {
    selectUse: (state) => state.user,
    selectTransactionsTotal: (state) => state.transactionsTotal,
    selectIsRefresh: (state) => state.isRefresh,
  },
  extraReducers: (builder) => {
    builder
      .addCase(userRefresh.fulfilled, (state, { payload }) => {
        state.accessToken = payload.accessToken;
        state.refreshToken = payload.refreshToken;
        state.sid = payload.sid;
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
      .addMatcher(
        isAnyOf(userLogin.fulfilled, userSignup.fulfilled),
        (state, { payload }) => {
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
          userCurrent.pending
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
          userCurrent.rejected
        ),
        (state, { payload }) => {
          state.isLoading = false;
          state.error = payload;
        }
      );
  },
});

export const AuthReducer = AuthSlice.reducer;
export const { selectUse, selectTransactionsTotal, selectIsRefresh } =
  AuthSlice.selectors;
