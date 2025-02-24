import { configureStore } from "@reduxjs/toolkit";
import RegisterReducer from "../slices/RegisterSlice";
export const store = configureStore({
  reducer: {
    register: RegisterReducer,
  },
});

export default store;
