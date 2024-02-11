import { createAsyncThunk } from "@reduxjs/toolkit"
import { api, setToken, clearToken } from "../../axiosConfig/expenseTrackerApi"
import { fetchUserThunk } from "../user/operations"

export const registerThunk = createAsyncThunk(
  "register",
  async (credentials, thunkAPI) => {
    try {
      await api.post("/auth/register", credentials)
    } catch (error) {
      if (error.request.status === 409) {
        return thunkAPI.rejectWithValue("The email is already in use.")
      }

      return thunkAPI.rejectWithValue(error.message)
    }
  },
)

export const loginThunk = createAsyncThunk(
  "login",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await api.post("/auth/login", credentials)
      setToken(data.accessToken)
      return data
    } catch (error) {
      if (error.request.status === 403) {
        return thunkAPI.rejectWithValue(
          "The email doesn't exist or password is incorrect. Please try again.",
        )
      }
      return thunkAPI.rejectWithValue(error.message)
    }
  },
)

export const logoutThunk = createAsyncThunk("logout", async (sid, thunkAPI) => {
  try {
    await api.get("/auth/logout", { sid })
    clearToken()
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message)
  }
})

export const refreshThunk = createAsyncThunk("refresh", async (_, thunkAPI) => {
  const refreshToken = thunkAPI.getState().auth.refreshToken
  const sid = thunkAPI.getState().auth.sid
  if (!refreshToken) {
    return thunkAPI.rejectWithValue("The token doesn't exist")
  }

  try {
    setToken(refreshToken)
    const { data } = await api.post("/auth/refresh", { sid })
    setToken(data.accessToken)
    thunkAPI.dispatch(fetchUserThunk())

    return data
  } catch (error) {
    const status = error.request.status
    if (status !== 400) return thunkAPI.rejectWithValue("reset")

    return thunkAPI.rejectWithValue(error.message)
  }
})
