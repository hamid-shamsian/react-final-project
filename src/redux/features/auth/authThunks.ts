import { createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../../../services/authService";
import userService from "../../../services/userService";

export const getLoggedInUser = createAsyncThunk("auth/getLoggedInUser", async (_, thunkAPI) => {
  try {
    return await userService.getLoggedInUser();
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.status);
  }
});

export const login = createAsyncThunk("auth/login", async (credentials: { username: string; password: string }, thunkAPI) => {
  try {
    return await authService.login(credentials);
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.status);
  }
});

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    return await authService.logout();
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.status);
  }
});
