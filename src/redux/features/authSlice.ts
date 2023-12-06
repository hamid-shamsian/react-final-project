import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "authentication",
  initialState: null,
  reducers: {
    setUser: (state, action) => (state = action.payload)
  }
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
