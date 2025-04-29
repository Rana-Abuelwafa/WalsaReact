import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunks for API calls
export const fetchBrand = createAsyncThunk(
  'brand/fetchBrand',
  async ({ clientId, accessToken }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://waslaa.de:4431/api/WaslaClient/GetClientBrands",
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json"
          }
        }
      );
      return response.data?.find(brand => brand.client_Id === clientId) || null;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const saveBrand = createAsyncThunk(
  'brand/saveBrand',
  async ({ formData, accessToken }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://waslaa.de:4431/api/WaslaClient/saveClientBrand",
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json"
          }
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const brandSlice = createSlice({
  name: 'brand',
  initialState: {
    data: null,
    loading: false,
    error: null,
    saveSuccess: false
  },
  reducers: {
    resetBrandState: (state) => {
      state.loading = false;
      state.error = null;
      state.saveSuccess = false;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Brand cases
      .addCase(fetchBrand.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBrand.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
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
        state.data = action.payload;
        state.saveSuccess = true;
      })
      .addCase(saveBrand.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { resetBrandState } = brandSlice.actions;
export default brandSlice.reducer;