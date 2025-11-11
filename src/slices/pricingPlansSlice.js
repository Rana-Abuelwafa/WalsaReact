import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { checkAUTH } from "../helper/helperFN";
import { createAuthError } from "../utils/authError";
import axios from "axios";
import api from "../api/axios";
// Base URL for API calls from environment variables
const BROWSE_URL = process.env.REACT_APP_BROWSE_API_URL;
const BASE_URL = process.env.REACT_APP_API_URL;

// const getAuthHeaders = () => {
//   const user = JSON.parse(localStorage.getItem("user"));
//   const accessToken = user?.accessToken;
//   let lang = localStorage.getItem("lang");
//   return {
//     headers: {
//       Authorization: `Bearer ${accessToken}`,
//       "Content-Type": "application/json",
//       "Accept-Language": lang,
//     },
//   };
// };
// Async thunk to fetch brand data
export const fetchPricingPlans = createAsyncThunk(
  "pricingPlans/fetchPricingPlans", // action type prefix
  async ({ lang, curr_code }, { rejectWithValue }) => {
    let userId = null;
    // Try to get user from localStorage
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      userId = user?.id || null;
    } catch (err) {
      userId = null; // fallback if parsing fails
    }

    const requestParams = {
      lang,
      curr_code,
      client_id: userId,
    };

    try {
      // Make POST request to get client brands
      const response = await axios.post(
        BROWSE_URL + "/GetPricingPackageWithService",
        requestParams
      );
      // Find and return the brand matching the clientId
      return response.data;
    } catch (error) {
      // Return error message if request fails
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Add this to your pricingPlansSlice.js
export const saveClientServices = createAsyncThunk(
  "pricingPlans/saveClientServices",
  async (requestData, { rejectWithValue }) => {
    // if (!checkAUTH()) {
    //   return rejectWithValue(createAuthError());
    // }

    try {
      const response = await api.post(
        BASE_URL + "/MakeClientInvoiceForPackages",
        requestData
        //getAuthHeaders()
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

//request for cutom service

export const RequestForCustomPackage = createAsyncThunk(
  "pricingPlans/RequestForCustomPackage",
  async (lang, { rejectWithValue }) => {
    try {
      const response = await api.post(
        BASE_URL + "/RequestForCustomPackage?lang=" + lang
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const pricingPlansSlice = createSlice({
  name: "pricingPlans",
  initialState: {
    data: null,
    loading: false,
    error: null,
    message: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPricingPlans.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPricingPlans.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchPricingPlans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(saveClientServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveClientServices.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(saveClientServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(RequestForCustomPackage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(RequestForCustomPackage.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(RequestForCustomPackage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default pricingPlansSlice.reducer;
