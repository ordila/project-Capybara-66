import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { addTransaction, fetchTransactions } from "./opeartions";
import { userCurrent, userLogin, userLogout, userRefresh } from "../auth";

const initialState = {
  filters: {
    category: "",
    date: "",
  },
  transactionsTotal: {
    incomes: 0,
    expenses: 0,
  },
  incomes: [],
  expenses: [],
  isLoading: false,
  error: null,
};

const TransactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    changeFilterCategory: (state, { payload }) => {
      state.filters.category = payload;
    },
    changeFilterDate: (state, { payload }) => {
      state.filters.date = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.fulfilled, (state, { payload }) => {
        state[payload.type] = payload.data;
      })
      .addCase(addTransaction.fulfilled, (state, { payload }) => {
        if (payload.type === "incomes") {
          state.incomes.push(payload);
        } else {
          state.expenses.push(payload);
        }
      })
      .addCase(userCurrent.fulfilled, (state, { payload }) => {
        state.transactionsTotal.incomes = payload.transactionsTotal.incomes;
        state.transactionsTotal.expenses = payload.transactionsTotal.expenses;
      })
      .addCase(userLogin.fulfilled, (state, { payload }) => {
        state.transactionsTotal.incomes =
          payload.user.transactionsTotal.incomes;
        state.transactionsTotal.expenses =
          payload.user.transactionsTotal.expenses;
      })
      .addCase(userLogout.fulfilled, (state) => {
        return initialState;
      })
      .addMatcher(
        isAnyOf(fetchTransactions.fulfilled, addTransaction.fulfilled),
        (state) => {
          state.isLoading = false;
        }
      )
      .addMatcher(
        isAnyOf(fetchTransactions.pending, addTransaction.pending),
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(fetchTransactions.rejected, addTransaction.rejected),
        (state, { payload }) => {
          state.isLoading = false;
          state.error = payload;
        }
      );
  },
});

export const TransactionsReducer = TransactionsSlice.reducer;
export const { changeFilterCategory, changeFilterDate } =
  TransactionsSlice.actions;
