import { createSelector } from "@reduxjs/toolkit"
import { selectTransactions } from "../transactions/slice"

export const selectFiltersCategory = state => state.transactionsFilters.category
export const selectFiltersDate = state => state.transactionsFilters.date

export const selectFilteredTransactions = createSelector(
  [selectTransactions, selectFiltersCategory],
  (expenses, filter) => {
    return expenses.filter(transaction =>
      transaction.comment.toLowerCase().includes(filter.toLowerCase()),
    )
  },
)
