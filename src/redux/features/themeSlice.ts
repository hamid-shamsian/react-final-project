import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "themeMode",
  initialState: "light",
  reducers: {
    toggle: state => (state === "light" ? "dark" : "light")
  }
});

export default themeSlice.reducer;

export const themeActions = themeSlice.actions;
