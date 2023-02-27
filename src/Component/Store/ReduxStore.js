import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "./Slice";

const store = configureStore({
  reducer: themeSlice.reducer,
});
export default store;
