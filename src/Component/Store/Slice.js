import { createSlice } from "@reduxjs/toolkit";
const themeState = {
  toggle: false,
};
const themeSlice = createSlice({
  name: "mode",
  initialState: themeState,
  reducers: {
    toggleButton(state) {
      state.toggle = !state.toggle;
    },
  },
});
export const { toggleButton } = themeSlice.actions;
export default themeSlice;
