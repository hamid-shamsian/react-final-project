import { SerializedError, createSlice } from "@reduxjs/toolkit";
import { getLoggedInUser, login, logout } from "./authThunks";

const initialState: { user: any; isPending: boolean; error: null | SerializedError } = {
  user: null,
  isPending: false,
  error: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getLoggedInUser.pending, _ => ({ user: null, isPending: true, error: null }))
      .addCase(getLoggedInUser.fulfilled, (_, action) => ({ user: action.payload, isPending: false, error: null }))
      .addCase(getLoggedInUser.rejected, (_, action) => ({ user: null, isPending: false, error: action.payload as SerializedError }));

    builder
      .addCase(login.pending, _ => ({ user: null, isPending: true, error: null }))
      .addCase(login.fulfilled, (_, action) => ({ user: action.payload, isPending: false, error: null }))
      .addCase(login.rejected, (_, action) => ({ user: null, isPending: false, error: action.payload as SerializedError }));

    builder
      .addCase(logout.pending, state => {
        state.isPending = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, () => ({ user: null, isPending: false, error: null }))
      .addCase(logout.rejected, (state, action) => {
        state.isPending = false;
        state.error = action.payload as SerializedError;
      });
  }
});

export default authSlice.reducer;

export const authActions = authSlice.actions;
