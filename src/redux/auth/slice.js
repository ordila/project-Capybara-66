import { createSlice, isAnyOf } from "@reduxjs/toolkit"
import {
  loginThunk,
  logoutThunk,
  refreshThunk,
  registerThunk,
} from "./operations"

const initialState = {
  sid: null,
  accessToken: null,
  refreshToken: null,
  isLoggedIn: false,
  error: null,
  isLoading: false,
}

const slice = createSlice({
  name: "auth",
  initialState,
  extraReducers: builder => {
    builder
      .addCase(
        loginThunk.fulfilled,
        (state, { payload: { sid, accessToken, refreshToken } }) => {
          state.sid = sid
          state.accessToken = accessToken
          state.refreshToken = refreshToken
          state.isLoggedIn = true
        },
      )
      .addCase(logoutThunk.fulfilled, () => initialState)
      .addCase(
        refreshThunk.fulfilled,
        (state, { payload: { sid, accessToken, refreshToken } }) => {
          state.sid = sid
          state.accessToken = accessToken
          state.refreshToken = refreshToken
          state.isLoggedIn = true
        },
      )
      .addCase(refreshThunk.rejected, (state, { payload }) => {
        if (payload === "reset") {
          return initialState
        }

        state.error = payload
        state.isLoading = false
      })
      .addMatcher(
        isAnyOf(
          registerThunk.pending,
          loginThunk.pending,
          logoutThunk.pending,
          refreshThunk.pending,
        ),
        state => {
          state.isLoading = true
          state.error = null
        },
      )
      .addMatcher(
        isAnyOf(
          registerThunk.fulfilled,
          loginThunk.fulfilled,
          logoutThunk.fulfilled,
          refreshThunk.fulfilled,
        ),
        state => {
          state.isLoading = false
        },
      )
      .addMatcher(
        isAnyOf(
          loginThunk.rejected,
          registerThunk.rejected,
          logoutThunk.rejected,
        ),
        (state, { payload }) => {
          state.error = payload
          state.isLoading = false
        },
      )
  },
  selectors: {
    selectSid: state => state.sid,
    selectAccessToken: state => state.accessToken,
    selectRefreshToken: state => state.refreshToken,
    selectIsLoggedIn: state => state.isLoggedIn,
    selectError: state => state.error,
    selectIsLoading: state => state.isLoading,
  },
})

export const authReducer = slice.reducer

export const {
  selectSid,
  selectAccessToken,
  selectRefreshToken,
  selectIsLoggedIn,
  selectError,
  selectIsLoading,
} = slice.selectors
