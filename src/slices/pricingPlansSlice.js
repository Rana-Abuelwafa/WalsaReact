import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { checkAUTH } from "../helper/helperFN";
import { history } from "../index";
import axios from "axios";

// Base URL for API calls from environment variables
const BROWSE_URL = process.env.REACT_APP_BROWSE_API_URL;
const BASE_URL = process.env.REACT_APP_API_URL;

const getAuthHeaders = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const accessToken = user?.accessToken;
  const userId = user?.id;
  let lang = localStorage.getItem("lang");
  return {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      "Accept-Language": lang,
    },
  };
};
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
    // Check authentication before making the request
    // if (checkAUTH()) {
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
    // }
    // else {
    //     // Redirect to login if not authenticated
    //     history.push("/login");
    //     window.location.reload();
    //     return null;
    // }
  }
);

// Add this to your pricingPlansSlice.js
export const saveClientServices = createAsyncThunk(
  "pricingPlans/saveClientServices",
  async (requestData, { rejectWithValue }) => {
    if (checkAUTH()) {
      try {
        const response = await axios.post(
          BASE_URL + "/MakeClientInvoiceForPackages",
          requestData,
          getAuthHeaders()
        );
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);
      }
    } else {
      history.push("/login");
      window.location.reload();
      return null;
    }
  }
);

const pricingPlansSlice = createSlice({
  name: "pricingPlans",
  initialState: {
    data: null,
    loading: false,
    error: null,
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
      });
  },
});

export default pricingPlansSlice.reducer;
