import { createSlice, isAnyOf } from "@reduxjs/toolkit"
import { loginThunk, logoutThunk } from "../auth/operations"
import {
  deleteUsersAvatarThunk,
  fetchUserThunk,
  updateUsersAvatarThunk,
  updateUsersInfoThunk,
} from "./operations"

const initialState = {
  _id: null,
  name: null,
  email: null,
  avatarUrl: null,
  currency: null,
  isLoading: false,
  error: null,
}

const spreadUser = ({ _id, name, email, avatarUrl, currency }) => {
  const newState = { ...initialState, _id, name, email, avatarUrl, currency }
  return newState
}

const slice = createSlice({
  name: "user",
  initialState,
  extraReducers: builder => {
    builder
      .addCase(loginThunk.fulfilled, (_, { payload: { user } }) =>
        spreadUser(user),
      )
      .addCase(logoutThunk.fulfilled, () => initialState)
      .addCase(fetchUserThunk.fulfilled, (_, { payload }) =>
        spreadUser(payload),
      )
      .addCase(
        updateUsersInfoThunk.fulfilled,
        (state, { payload: { _id, name, currency } }) => {
          state._id = _id
          state.name = name
          state.currency = currency
        },
      )
      .addCase(updateUsersAvatarThunk.fulfilled, (state, { payload }) => {
        state.avatarUrl = payload
      })
      .addCase(deleteUsersAvatarThunk.fulfilled, state => {
        state.avatarUrl = null
      })
      .addMatcher(
        isAnyOf(
          fetchUserThunk.pending,
          updateUsersInfoThunk.pending,
          updateUsersAvatarThunk.pending,
          deleteUsersAvatarThunk.pending,
        ),
        state => {
          state.isLoading = true
          state.error = null
        },
      )
      .addMatcher(
        isAnyOf(
          fetchUserThunk.fulfilled,
          updateUsersInfoThunk.fulfilled,
          updateUsersAvatarThunk.fulfilled,
          deleteUsersAvatarThunk.fulfilled,
        ),
        state => {
          state.isLoading = false
        },
      )
      .addMatcher(
        isAnyOf(
          fetchUserThunk.rejected,
          updateUsersInfoThunk.rejected,
          updateUsersAvatarThunk.rejected,
          deleteUsersAvatarThunk.rejected,
        ),
        (state, { payload }) => {
          state.error = payload
          state.isLoading = false
        },
      )
  },
  selectors: {
    selectId: state => state._id,
    selectName: state => state.name,
    selectEmail: state => state.email,
    selectAvatarUrl: state => state.avatarUrl,
    selectCurrency: state => state.currency,
    selectIsLoading: state => state.isLoading,
    selectError: state => state.error,
  },
})

export const userReducer = slice.reducer

export const {
  selectId,
  selectName,
  selectEmail,
  selectAvatarUrl,
  selectCurrency,
  selectIsLoading,
  selectError,
} = slice.selectors
