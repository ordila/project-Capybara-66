import { createAsyncThunk } from "@reduxjs/toolkit"
import { api } from "../../axiosConfig/expenseTrackerApi"

export const fetchUserThunk = createAsyncThunk(
  "get user",
  async (_, thunkAPI) => {
    try {
      const { data } = await api.get("/users/current")
      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

export const updateUsersInfoThunk = createAsyncThunk(
  "update user",
  async (reqData, thunkAPI) => {
    try {
      const { data } = await api.patch("/users/info", reqData)
      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

export const updateUsersAvatarThunk = createAsyncThunk(
  "update users avatar",
  async (avatar, thunkAPI) => {
    try {
      const formData = new FormData()
      formData.append("avatar", avatar)

      const { data } = await api.patch("/users/avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      return data.avatarUrl
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

export const deleteUsersAvatarThunk = createAsyncThunk(
  "delete users avatar",
  async (avatarId, thunkAPI) => {
    try {
      await api.delete(`/users/avatar/${avatarId}`)
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)
