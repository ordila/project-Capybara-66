import { createSelector } from "@reduxjs/toolkit"
import { selectTransactions } from "../transactions/slice"

export const selectFilterType = state => state.transactionsFilters.type
export const selectFiltersCategory = state => state.transactionsFilters.category
export const selectFiltersDate = state => state.transactionsFilters.date

export const selectFilteredTransactions = createSelector(
  [
    selectTransactions,
    selectFiltersCategory,
    selectFiltersDate,
    selectFilterType,
  ],
  (expenses, filterCategory, filterDate, filterType) => {
    return expenses.filter(
      transaction =>
        transaction.comment
          .toLowerCase()
          .includes(filterCategory.toLowerCase()) &&
        transaction.date === filterDate &&
        transaction.type === filterType,
    )
  },
)
