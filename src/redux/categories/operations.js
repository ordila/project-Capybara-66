import { createAsyncThunk } from "@reduxjs/toolkit"
import { api } from "../../axiosConfig/expenseTrackerApi"

export const createCategotyThunk = createAsyncThunk(
  "create a category",
  async (reqData, thunkAPI) => {
    try {
      const { data } = await api.post("/categories", reqData)
      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

export const fetchCategoriesThunk = createAsyncThunk(
  "get categories",
  async (_, thunkAPI) => {
    try {
      const { data } = await api.get("/categories")
      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

export const updateCategoryThunk = createAsyncThunk(
  "update a category",
  async ({ reqData, id }, thunkAPI) => {
    try {
      const { data } = await api.patch(`/categories/${id}`, reqData)
      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

export const deleteCategoryThunk = createAsyncThunk(
  "delete a category",
  async (id, thunkAPI) => {
    try {
      await api.delete(`/categories/${id}`)
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)
