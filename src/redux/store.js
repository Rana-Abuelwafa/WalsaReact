import { configureStore } from "@reduxjs/toolkit";
import RegisterReducer from "../slices/RegisterSlice";
import authReducer from "../slices/authSlice";
import brandReducer from "../slices/brandSlice";
import profileReducer from "../slices/profileSlice";
export const store = configureStore({
  reducer: {
    register: RegisterReducer,
    auth: authReducer,
    brand: brandReducer,
    profile: profileReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActionPaths: ['payload.file'],
        ignoredPaths: ['profile.image']
      }
    })
});

export default store;
