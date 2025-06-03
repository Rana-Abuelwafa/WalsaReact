import { configureStore } from "@reduxjs/toolkit";
import RegisterReducer from "../slices/RegisterSlice";
import authReducer from "../slices/authSlice";
import brandReducer from "../slices/brandSlice";
import profileReducer from "../slices/profileSlice";
import productReducer from '../slices/productSlice';
import pricingPlansReducer from '../slices/pricingPlansSlice';

export const store = configureStore({
  reducer: {
    register: RegisterReducer,
    auth: authReducer,
    brand: brandReducer,
    profile: profileReducer,
    products: productReducer,
    pricingPlans: pricingPlansReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export default store;
