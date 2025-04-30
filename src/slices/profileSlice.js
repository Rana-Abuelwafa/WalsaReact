import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL;
const initialState = {
  profileData: {},
  profileImage: null,
  loading: false,
  error: null,
  success: false
};

// Async thunks
export const fetchProfile = createAsyncThunk(
  'profile/fetchProfile',
  async ({ accessToken, userId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        BASE_URL + "/GetClientProfiles",
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      
      if (response.data && Array.isArray(response.data)) {
        const userProfile = response.data.find(
          (profile) => profile.client_id === userId
        );
        return userProfile || {};
      }
      return {};
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const saveProfile = createAsyncThunk(
  'profile/saveProfile',
  async ({ accessToken, formData }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        BASE_URL + "/saveMainProfile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
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
        BASE_URL + "/GetProfileImage",
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data?.img || null;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const uploadProfileImage = createAsyncThunk(
  'profile/uploadProfileImage',
  async ({ accessToken, imageFile }, { rejectWithValue }) => {
    try {
        const requestBody = { img: imageFile };
      
      const response = await axios.post(
        BASE_URL + "/saveProfileImage",
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return URL.createObjectURL(imageFile);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    resetProfileStatus: (state) => {
      state.success = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Profile
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profileData = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Save Profile
      .addCase(saveProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.profileData = action.payload;
      })
      .addCase(saveProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch Profile Image
      .addCase(fetchProfileImage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfileImage.fulfilled, (state, action) => {
        state.loading = false;
        state.profileImage = action.payload;
      })
      .addCase(fetchProfileImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Upload Profile Image
      .addCase(uploadProfileImage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadProfileImage.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.profileImage = action.payload;
      })
      .addCase(uploadProfileImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { resetProfileStatus } = profileSlice.actions;
export default profileSlice.reducer;