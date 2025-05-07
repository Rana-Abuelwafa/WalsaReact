import { configureStore } from "@reduxjs/toolkit";
import RegisterReducer from "../slices/RegisterSlice";
import authReducer from "../slices/authSlice";
import brandReducer from "../slices/brandSlice";
import profileReducer from "../slices/profileSlice";
import productReducer from '../slices/productSlice';

export const store = configureStore({
  reducer: {
    register: RegisterReducer,
    auth: authReducer,
    brand: brandReducer,
    profile: profileReducer,
    products: productReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export default store;
