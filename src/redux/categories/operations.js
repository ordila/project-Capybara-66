import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../axiosConfig/expenseTrackerApi";

export const createCategoryThunk = createAsyncThunk(
  "create a category",
  async (reqData, thunkAPI) => {
    try {
      const { data } = await api.post("/categories", reqData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchCategoriesThunk = createAsyncThunk(
  "get categories",
  async (_, thunkAPI) => {
    try {
      const { data } = await api.get("/categories");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateCategoryThunk = createAsyncThunk(
  "update a category",
  async ({ id, newName, type }, thunkAPI) => {
    try {
      const { data } = await api.patch(`/categories/${id}`, {
        categoryName: newName,
      });
      return { ...data, type };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteCategoryThunk = createAsyncThunk(
  "delete a category",
  async ({ id, type }, thunkAPI) => {
    try {
      await api.delete(`/categories/${id}`);
      return { id, type };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
