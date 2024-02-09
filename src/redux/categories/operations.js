import { createAsyncThunk } from "@reduxjs/toolkit";
import { expTrackApi } from "../../axiosConfig/expTrackApi";

export const fetchCategories = createAsyncThunk(
  "categories",
  async (_, thunkAPI) => {
    try {
      const { data } = await expTrackApi.get("categories");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addCategory = createAsyncThunk(
  "categories/add",
  async (category, thunkAPI) => {
    try {
      const { data } = await expTrackApi.post("categories", category);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
