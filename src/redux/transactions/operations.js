import { createAsyncThunk } from "@reduxjs/toolkit"
import { api } from "../../axiosConfig/expenseTrackerApi"

export const createTransactionThunk = createAsyncThunk(
  "create a transaction",
  async (reqData, thunkAPI) => {
    try {
      const { data } = await api.post("/transactions", reqData)
      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  },
)

export const fetchTransactionsThunk = createAsyncThunk(
  "get transactions",
  async ({ type, date }, thunkAPI) => {
    try {
      const params = new URLSearchParams({ type, date })
      const { data } = await api.get(`/transactions/${type}`, { params })
      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  },
)

export const updateTransactionThunk = createAsyncThunk(
  "update a transaction",
  async ({ reqData, id, type }, thunkAPI) => {
    try {
      const { data } = await api.patch(`/transactions/${type}/${id}`, reqData)
      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  },
)

export const deleteTransactionThunk = createAsyncThunk(
  "delete a transaction",
  async (id, thunkAPI) => {
    try {
      await api.delete(`/transactions/${id}`)
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  },
)
