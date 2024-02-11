import { createSlice, isAnyOf } from "@reduxjs/toolkit"
import { loginThunk, logoutThunk } from "../auth/operations"
import {
  createCategotyThunk,
  fetchCategoriesThunk,
  updateCategoryThunk,
  deleteCategoryThunk,
} from "./operations"

const initialState = {
  incomes: [],
  expenses: [],
  isLoading: false,
  error: null,
}

const spreadCategories = (state, { incomes, expenses }) => {
  state.incomes = incomes || []
  state.expenses = expenses || []
}

const slice = createSlice({
  name: "categories",
  initialState,
  extraReducers: builder => {
    builder
      .addCase(loginThunk.fulfilled, (state, action) => {
        spreadCategories(state, action.payload.user.categories)
      })
      .addCase(logoutThunk.fulfilled, () => initialState)
      .addCase(createCategotyThunk.fulfilled, (state, { payload }) => {
        if (payload.type === "incomes") state.incomes.push(payload)
        else state.expenses.push(payload)
      })
      .addCase(fetchCategoriesThunk.fulfilled, (state, action) => {
        spreadCategories(state, action.payload)
      })
      .addMatcher(
        isAnyOf(
          createCategotyThunk.pending,
          fetchCategoriesThunk.pending,
          updateCategoryThunk.pending,
          deleteCategoryThunk.pending
        ),
        state => {
          state.isLoading = true
          state.error = null
        }
      )
      .addMatcher(
        isAnyOf(
          createCategotyThunk.fulfilled,
          fetchCategoriesThunk.fulfilled,
          updateCategoryThunk.fulfilled,
          deleteCategoryThunk.fulfilled
        ),
        state => {
          state.isLoading = false
        }
      )
      .addMatcher(
        isAnyOf(
          createCategotyThunk.rejected,
          fetchCategoriesThunk.rejected,
          updateCategoryThunk.rejected,
          deleteCategoryThunk.rejected
        ),
        (state, { payload }) => {
          state.error = payload
          state.isLoading = false
        }
      )
  },
  selectors: {
    selectIncomes: state => state.incomes,
    selectExpenses: state => state.expenses,
    selectIsLoading: state => state.isLoading,
    selectError: state => state.error,
  },
})

export const categoriesReducer = slice.reducer

export const {
  selectIncomes,
  selectExpenses,
  selectIsLoading,
  selectError,
} = slice.selectors
