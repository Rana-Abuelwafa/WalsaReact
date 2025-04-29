import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunks for API calls
export const fetchProfileData = createAsyncThunk(
  'profile/fetchProfileData',
  async (accessToken, { getState, rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://waslaa.de:4431/api/WaslaClient/GetClientProfiles",
        {},
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

export const fetchProfileImage = createAsyncThunk(
  'profile/fetchProfileImage',
  async (accessToken, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://waslaa.de:4431/api/WaslaClient/GetProfileImage",
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json"
          }
        }
      );
      return response.data?.img || null;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const saveProfileImage = createAsyncThunk(
    'profile/saveProfileImage',
    async ({ file, accessToken }, { rejectWithValue }) => {
      try {
        const requestData = { img: file };
        
        const response = await axios.post(
          "https://waslaa.de:4431/api/WaslaClient/saveProfileImage",
          requestData,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "multipart/form-data" // Keep this as the endpoint expects file upload
            }
          }
        );
        return { imageUrl: URL.createObjectURL(file), serverResponse: response.data };
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);
      }
    }
  );

export const saveProfile = createAsyncThunk(
  'profile/saveProfile',
  async ({ formData, accessToken }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://waslaa.de:4431/api/WaslaClient/saveMainProfile",
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

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    data: null,
    image: null,
    loading: false,
    loadingImage: false,
    error: null,
    imageError: null,
    saveSuccess: false,
    imageSaveSuccess: false
  },
  reducers: {
    resetProfileState: (state) => {
      state.loading = false;
      state.error = null;
      state.saveSuccess = false;
      state.imageSaveSuccess = false;
    },
    updateFormData: (state, action) => {
      if (state.data) {
        state.data = { ...state.data, ...action.payload };
      }
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Profile Data
      .addCase(fetchProfileData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfileData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload?.[0] || null;
      })
      .addCase(fetchProfileData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch Profile Image
      .addCase(fetchProfileImage.pending, (state) => {
        state.loadingImage = true;
        state.imageError = null;
      })
      .addCase(fetchProfileImage.fulfilled, (state, action) => {
        state.loadingImage = false;
        state.image = action.payload;
      })
      .addCase(fetchProfileImage.rejected, (state, action) => {
        state.loadingImage = false;
        state.imageError = action.payload;
      })
      
      // Save Profile Image
      .addCase(saveProfileImage.pending, (state) => {
        state.loadingImage = true;
        state.imageError = null;
        state.imageSaveSuccess = false;
      })
      .addCase(saveProfileImage.fulfilled, (state, action) => {
        state.loadingImage = false;
        state.image = action.payload.imageUrl;
        state.imageSaveSuccess = true;
      })
      .addCase(saveProfileImage.rejected, (state, action) => {
        state.loadingImage = false;
        state.imageError = action.payload;
      })
      
      // Save Profile
      .addCase(saveProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.saveSuccess = false;
      })
      .addCase(saveProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.saveSuccess = true;
      })
      .addCase(saveProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { resetProfileState, updateFormData } = profileSlice.actions;
export default profileSlice.reducer;