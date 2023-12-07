import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "authentication",
  initialState: null,
  reducers: {
    setUser: (state, action) => (state = action.payload)
  }
});

export default userSlice.reducer;

export const userActions = userSlice.actions;
