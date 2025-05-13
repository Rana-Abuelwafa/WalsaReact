import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { checkAUTH } from "../helper/helperFN";
import { history } from "../index";
import axios from 'axios';

// Base URL for API calls from environment variables
const BASE_URL = process.env.REACT_APP_API_URL;

// Async thunk to fetch brand data
export const fetchBrand = createAsyncThunk(
  'brand/fetchBrand',  // action type prefix
  async ({ clientId, accessToken }, { rejectWithValue }) => {
    // Check authentication before making the request
    if (checkAUTH()) {
        try {
        // Make POST request to get client brands
        const response = await axios.post(
            BASE_URL + "/GetClientBrands",
            {},  // empty request body
            {
            headers: {
                Authorization: `Bearer ${accessToken}`,  // auth header
                "Content-Type": "application/json"
            }
            }
        );
        // Find and return the brand matching the clientId
        return response.data?.find(brand => brand.client_Id === clientId) || null;
        } catch (error) {
        // Return error message if request fails
        return rejectWithValue(error.response?.data?.message || error.message);
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
  'brand/saveBrand',  // action type prefix
  async ({ formData, accessToken }, { rejectWithValue }) => {
    if (checkAUTH()) {
        try {
            // Prepare payload ensuring ID is never undefined
            const payload = {
                ...formData,
                id: formData.id || 0 // Default to 0 if ID not provided
              };
        // Make POST request to save brand data
        const response = await axios.post(
            BASE_URL + "/saveClientBrand",
            payload,
            {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            }
            }
        );
        // Return response data with proper ID handling
        return {
            ...response.data,
            id: response.data.idout || formData.id || 0
          };
        } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);
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
  name: 'brand',  // slice name
  initialState: {
    data: null,          // stores brand data
    loading: false,      // loading state
    error: null,         // error message
    saveSuccess: false  // flag for successful save
  },
  reducers: {
    // Reducer to reset brand state
    resetBrandState: (state) => {
      state.loading = false;
      state.error = null;
      state.saveSuccess = false;
    }
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
        state.data = action.payload ? {
            ...action.payload,
            id: action.payload.id || 0 
          } : null;
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
            id: action.payload.idout || state.data?.id || 0 
          };
        state.saveSuccess = true;  // set success flag
      })
      .addCase(saveBrand.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

// Export actions and reducer
export const { resetBrandState } = brandSlice.actions;
export default brandSlice.reducer;