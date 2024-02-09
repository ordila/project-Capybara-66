import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { addCategory, fetchCategories } from "./operations";
import { userCurrent, userLogin } from "../auth";

const initialState = {
  incomes: [],
  expenses: [],
  isLoading: true,
  error: null,
};

const CategorySlice = createSlice({
  name: "categories",
  initialState,
  selectors: {
    selectCategoryIncomes: (state) => state.incomes,
    selectCategoryExpenses: (state) => state.expenses,
    selectIsLoading: (state) => state.isLoading,
    selectError: (state) => state.error,
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.fulfilled, (state, { payload: { user } }) => {
        const { categories } = user;
        state.incomes = categories.incomes ? categories.incomes : [];
        state.expenses = categories.expenses ? categories.expenses : [];
      })
      .addCase(userCurrent.fulfilled, (state, { payload: { categories } }) => {
        state.incomes = categories.incomes ? categories.incomes : [];
        state.expenses = categories.expenses ? categories.expenses : [];
      })
      .addCase(fetchCategories.fulfilled, (state, { payload }) => {
        state.incomes = payload.incomes ? payload.incomes : [];
        state.expenses = payload.expenses ? payload.expenses : [];
      })
      .addCase(addCategory.fulfilled, (state, { payload }) => {
        state.incomes.push(payload);
      })
      .addMatcher(
        isAnyOf(addCategory.fulfilled, fetchCategories.fulfilled),
        (state) => {
          state.isLoading = false;
        }
      )
      .addMatcher(
        isAnyOf(addCategory.pending, fetchCategories.pending),
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(addCategory.rejected, fetchCategories.rejected),
        (state, { payload }) => {
          state.isLoading = false;
          state.error = payload;
        }
      );
  },
});

export const CategoriesReducer = CategorySlice.reducer;
export const {
  selectCategoryIncomes,
  selectCategoryExpenses,
  selectIsLoading,
  selectError,
} = CategorySlice.selectors;
