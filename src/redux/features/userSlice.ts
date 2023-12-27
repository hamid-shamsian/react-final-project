import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser: (_, action) => action.payload
  }
});

export default userSlice.reducer;

export const userActions = userSlice.actions;
