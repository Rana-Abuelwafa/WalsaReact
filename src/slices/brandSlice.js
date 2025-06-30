import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { checkAUTH } from "../helper/helperFN";
import { history } from "../index";
import axios from "axios";

// Base URL for API calls from environment variables
const BASE_URL = process.env.REACT_APP_API_URL;
const getAuthHeaders = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const accessToken = user?.accessToken;
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
export const fetchBrand = createAsyncThunk(
  "brand/fetchBrand", // action type prefix
  async (_, { rejectWithValue }) => {
    // Check authentication before making the request
    if (checkAUTH()) {
      try {
        // Make POST request to get client brands
        const response = await axios.post(
          BASE_URL + "/GetClientBrands",
          {}, // empty request body
          getAuthHeaders()
        );
        if (response.data.success === false) {
          return rejectWithValue(response.data.errors || "Failed to fetch brand");
        }
        // Return the brand data (could be single object or first item in array)
        return Array.isArray(response.data) ? response.data[0] || null : response.data || null;
      } catch (error) {
        // Return error message if request fails
        return rejectWithValue(error.response?.data?.errors || error.message);
      }
    } else {
      // Redirect to login if not authenticated
      history.push("/login");
      window.location.reload();
      return null;
    }
  }
);

// Async thunk to save brand data
export const saveBrand = createAsyncThunk(
  "brand/saveBrand", // action type prefix
  async ({ formData }, { rejectWithValue }) => {
    if (checkAUTH()) {
      try {
        // Prepare payload ensuring ID is never undefined
        const payload = {
          ...formData,
          id: formData.id || 0, // Default to 0 if ID not provided
        };
        // Make POST request to save brand data
        const response = await axios.post(
          BASE_URL + "/saveClientBrand",
          payload,
          getAuthHeaders()
        );

        if (response.data.success === false) {
          return rejectWithValue(response.data.errors || "Operation failed");
        }
        return {
          ...formData,
          id: response.data.idOut || formData.id || 0,
        };
      } catch (error) {
        return rejectWithValue(error.response?.data?.errors || error.message);
      }
    } else {
      // Redirect to login if not authenticated
      history.push("/login");
      window.location.reload();
      return null;
    }
  }
);

// Create brand slice with initial state and reducers
const brandSlice = createSlice({
  name: "brand", // slice name
  initialState: {
    data: null, // stores brand data
    loading: false, // loading state
    error: null, // error message
    saveSuccess: false, // flag for successful save
  },
  reducers: {
    // Reducer to reset brand state
    resetBrandState: (state) => {
      state.loading = false;
      state.error = null;
      state.saveSuccess = false;
    },
  },
  // Handle async thunk actions
  extraReducers: (builder) => {
    builder
      // Fetch Brand cases
      .addCase(fetchBrand.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBrand.fulfilled, (state, action) => {
        state.loading = false;
        // Store fetched data with ID fallback
        state.data = action.payload
          ? {
              ...action.payload,
              id: action.payload.id || 0,
            }
          : null;
      })
      .addCase(fetchBrand.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Save Brand cases
      .addCase(saveBrand.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.saveSuccess = false;
      })
      .addCase(saveBrand.fulfilled, (state, action) => {
        state.loading = false;
        // Merge existing data with new data
        state.data = {
          ...state.data,
          ...action.payload,
          id: action.payload.id || state.data?.id || 0,
        };
        state.saveSuccess = true; // set success flag
      })
      .addCase(saveBrand.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.saveSuccess = false;
      });
  },
});

// Export actions and reducer
export const { resetBrandState } = brandSlice.actions;
export default brandSlice.reducer;
