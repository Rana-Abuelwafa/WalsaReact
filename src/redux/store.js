import { configureStore } from "@reduxjs/toolkit";
import RegisterReducer from "../slices/RegisterSlice";
import authReducer from "../slices/authSlice";
import brandReducer from "../slices/brandSlice";
import profileReducer from "../slices/profileSlice";
import productReducer from '../slices/productSlice';
import pricingPlansReducer from '../slices/pricingPlansSlice';
import languageReducer from '../slices/languageSlice';
import currencyReducer from '../slices/currencySlice';
import invoiceReducer  from '../slices/invoiceSlice';

export const store = configureStore({
  reducer: {
    register: RegisterReducer,
    auth: authReducer,
    brand: brandReducer,
    profile: profileReducer,
    products: productReducer,
    pricingPlans: pricingPlansReducer,
    language: languageReducer,
    currency: currencyReducer,
    invoice:invoiceReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export default store;
