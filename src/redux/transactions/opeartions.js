import { createAsyncThunk } from "@reduxjs/toolkit";
import { expTrackApi } from "../../axiosConfig/expTrackApi";
import { userCurrent } from "../auth";

export const fetchTransactions = createAsyncThunk(
  "transactions",
  async (type, thunkAPI) => {
    try {
      const params = { type };
      const { data } = await expTrackApi.get(`transactions/${type}`, {
        params,
      });
      return { type, data };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addTransaction = createAsyncThunk(
  "transactions/add",
  async (transaction, thunkAPI) => {
    try {
      const { data } = await expTrackApi.post("transactions", transaction);
      // Pull TransactionsTotal to update State
      await thunkAPI.dispatch(userCurrent());

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
