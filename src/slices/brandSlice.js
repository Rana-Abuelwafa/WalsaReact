import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { checkAUTH } from "../helper/helperFN";
import { history } from "../index";
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL;
// Async thunks for API calls
export const fetchBrand = createAsyncThunk(
  'brand/fetchBrand',
  async ({ clientId, accessToken }, { rejectWithValue }) => {
    if (checkAUTH()) {
        try {
        const response = await axios.post(
            BASE_URL + "/GetClientBrands",
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
    }else{
        history.push("/login");
        window.location.reload();
        return null;
    }   
  }
);

export const saveBrand = createAsyncThunk(
  'brand/saveBrand',
  async ({ formData, accessToken }, { rejectWithValue }) => {
    if (checkAUTH()) {
        try {
            const payload = {
                ...formData,
                id: formData.id || 0 // Ensure ID is never undefined
              };
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
        return {
            ...response.data,
            id: response.data.idout || formData.id || 0
          };
        } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);
        }
    }else{
        history.push("/login");
        window.location.reload();
        return null;
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
        state.data = {
            ...state.data, 
            ...action.payload, 
            id: action.payload.idout || state.data?.id || 0 
          };
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