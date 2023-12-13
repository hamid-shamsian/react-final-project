import { createSlice } from "@reduxjs/toolkit";

// export type ThemeState = "light" | "dark";

let initialState = localStorage.getItem("theme");
if (initialState !== "light" && initialState !== "dark") initialState = "light";

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggle: state => {
      state = state === "light" ? "dark" : "light";
      localStorage.setItem("theme", state);
      return state;
    }
  }
});

export default themeSlice.reducer;

export const themeActions = themeSlice.actions;
