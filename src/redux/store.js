import { configureStore } from "@reduxjs/toolkit";
import RegisterReducer from "../slices/RegisterSlice";
export const store = configureStore({
  reducer: {
    questions: RegisterReducer,
  },
});

export default store;
