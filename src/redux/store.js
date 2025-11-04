import { configureStore } from "@reduxjs/toolkit";
import RegisterReducer from "../slices/RegisterSlice";
import authReducer from "../slices/authSlice";
import brandReducer from "../slices/brandSlice";
import profileReducer from "../slices/profileSlice";
import productReducer from "../slices/productSlice";
import pricingPlansReducer from "../slices/pricingPlansSlice";
import languageReducer from "../slices/languageSlice";
import currencyReducer from "../slices/currencySlice";
import invoiceReducer from "../slices/invoiceSlice";
import contactReducer from "../slices/contactSlice";
import searchReducer from "../slices/searchSlice";
import { authMiddleware } from "../middleware/authMiddleware";

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
    invoice: invoiceReducer,
    contact: contactReducer,
    search: searchReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authMiddleware),
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: false,
  //   }),
});

export default store;
