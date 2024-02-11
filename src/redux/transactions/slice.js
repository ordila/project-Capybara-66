import { createSlice, isAnyOf } from "@reduxjs/toolkit"
import { loginThunk, logoutThunk } from "../auth/operations"
import {
  createTransactionThunk,
  fetchTransactionsThunk,
  updateTransactionThunk,
  deleteTransactionThunk,
} from "./operations"
import { fetchUserThunk } from "../user/operations"

const initialState = {
  list: [],
  transactionsTotal: {
    incomes: 0,
    expenses: 0,
  },
  isLoading: false,
  error: null,
}

const slice = createSlice({
  name: "transactions",
  initialState,
  extraReducers: builder => {
    builder
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.transactionsTotal = action.payload.user.transactionsTotal
      })
      .addCase(fetchUserThunk.fulfilled, (state, { payload }) => {
        state.transactionsTotal = payload
      })
      .addCase(logoutThunk.fulfilled, () => initialState)
      .addCase(fetchTransactionsThunk.fulfilled, (state, { payload }) => {
        state.list = payload
      })
      .addMatcher(
        isAnyOf(
          createTransactionThunk.pending,
          fetchTransactionsThunk.pending,
          updateTransactionThunk.pending,
          deleteTransactionThunk.pending
        ),
        state => {
          state.isLoading = true
          state.error = null
        }
      )
      .addMatcher(
        isAnyOf(
          createTransactionThunk.fulfilled,
          fetchTransactionsThunk.fulfilled,
          updateTransactionThunk.fulfilled,
          deleteTransactionThunk.fulfilled
        ),
        state => {
          state.isLoading = false
        }
      )
      .addMatcher(
        isAnyOf(
          createTransactionThunk.rejected,
          fetchTransactionsThunk.rejected,
          updateTransactionThunk.rejected,
          deleteTransactionThunk.rejected
        ),
        (state, { payload }) => {
          state.error = payload
          state.isLoading = false
        }
      )
  },
  selectors: {
    selectTransactions: state => state.list,
    selectTransactionsTotal: state => state.transactionsTotal,
    selectIsLoading: state => state.isLoading,
    selectError: state => state.error,
  },
})

export const transactionsReducer = slice.reducer

export const {
  selectTransactions,
  selectTransactionsTotal,
  selectIsLoading,
  selectError,
} = slice.selectors
