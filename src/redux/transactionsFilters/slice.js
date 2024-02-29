import { createSlice } from "@reduxjs/toolkit"
import { format } from "date-fns"

const initialState = {
  category: "",
  type: "",
  date: format(new Date(), "yyyy-MM-dd"),
}

const slice = createSlice({
  name: "transactionsFilters",
  initialState,
  reducers: {
    changeFilterType: (state, { payload }) => {
      state.type = payload
    },
    changeFilterCategory: (state, { payload }) => {
      state.category = payload
    },
    changeFilterDate: (state, { payload }) => {
      state.date = payload
    },
  },
})

export const transactionsFiltersReducer = slice.reducer
export const { changeFilterCategory, changeFilterDate, changeFilterType } =
  slice.actions
