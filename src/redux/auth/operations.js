import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  clearToken,
  expTrackApi,
  setToken,
} from "../../axiosConfig/expTrackApi";

export const userSignup = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      await expTrackApi.post("auth/register", credentials);
      delete credentials.name;
      return await thunkAPI.dispatch(userLogin(credentials));
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const userLogin = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await expTrackApi.post("auth/login", credentials);
      setToken(data.accessToken);

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const userLogout = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      await expTrackApi.get("auth/logout");
      clearToken();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const userRefresh = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    const refreshToken = thunkAPI.getState().auth.refreshToken;
    const sid = thunkAPI.getState().auth.sid;

    if (!refreshToken) {
      return thunkAPI.rejectWithValue("Token is invalid");
    }
    if (!sid) {
      return thunkAPI.rejectWithValue("Session ID is invalid");
    }

    try {
      setToken(refreshToken);
      const { data } = await expTrackApi.post("auth/refresh", { sid });
      setToken(data.accessToken);
      await thunkAPI.dispatch(userCurrent());

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const userCurrent = createAsyncThunk(
  "users/current",
  async (_, thunkAPI) => {
    try {
      const { data } = await expTrackApi.get("users/current");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
