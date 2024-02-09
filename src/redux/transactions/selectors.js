import { createSelector } from "@reduxjs/toolkit";

export const selectExpenses = (state) => state.transactions.expenses;
export const selectIncomes = (state) => state.transactions.incomes;
export const selectFiltersCategory = (state) =>
  state.transactions.filters.category;
export const selectFiltersDate = (state) => state.transactions.filters.date;

export const selectFilteredExpenses = createSelector(
  [selectExpenses, selectFiltersCategory],
  (expenses, filter) => {
    return expenses.filter((transaction) =>
      transaction.comment.toLowerCase().includes(filter.toLowerCase())
    );
  }
);

export const selectFilteredIncomes = createSelector(
  [selectIncomes, selectFiltersCategory],
  (incomes, filter) => {
    return incomes.filter((transaction) =>
      transaction.comment.toLowerCase().includes(filter.toLowerCase())
    );
  }
);
