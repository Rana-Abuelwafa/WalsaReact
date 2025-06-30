import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { checkAUTH } from "../helper/helperFN";
import { createAuthError } from "../utils/authError";
import axios from "axios";

// Base API URL from environment variables
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

// Helper to extract error message from different response formats
const getErrorMessage = (error) => {
  if (error.response?.data?.errors) {
    return error.response.data.errors;
  }
  if (error.response?.data?.msg) {
    return error.response.data.msg;
  }
  if (error.message) {
    return error.message;
  }
  return "An error occurred";
};

// Async thunk to fetch user profile data
export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async (_, { rejectWithValue }) => {
    if (!checkAUTH()) {
      return rejectWithValue(createAuthError());
    }

      try {
        // Make API call to get client profiles
        const response = await axios.post(
          BASE_URL + "/GetClientProfiles",
          {},
          getAuthHeaders()
        );

        return response.data?.[0] || {}; 
      } catch (error) {
        if (error.response?.status === 401) {
           return rejectWithValue(createAuthError());
        }
        return rejectWithValue(getErrorMessage(error));
      }
    }
);

// Async thunk to save profile data
export const saveProfile = createAsyncThunk(
  "profile/saveProfile",
  async (formData, { rejectWithValue }) => {
    if (!checkAUTH()) {
      return rejectWithValue(createAuthError());
    }
      try {
        // Make API call to save profile
        const response = await axios.post(
          BASE_URL + "/saveMainProfile",
          formData,
          getAuthHeaders()
        );
        // Return both API response and form data
        return {
          success: response.data.success,
          formData: formData,
          message: response.data.errors
        };
      } catch (error) {
        if (error.response?.status === 401) {
           return rejectWithValue(createAuthError());
        }
        return rejectWithValue(getErrorMessage(error));
      }
  }
);

// Async thunk to fetch profile image
export const fetchProfileImage = createAsyncThunk(
  "profile/fetchProfileImage",
  async (_, { rejectWithValue }) => {
    if (!checkAUTH()) {
      return rejectWithValue(createAuthError());
    }
      try {
        // Make API call to get profile image
        const response = await axios.post(
          BASE_URL + "/GetProfileImage",
          {},
          getAuthHeaders()
        );
      
        return response.data?.[0]?.img_path || null;
      } catch (error) {
        if (error.response?.status === 401) {
           return rejectWithValue(createAuthError());
        }
        return rejectWithValue(getErrorMessage(error));
      }
  }
);

// Async thunk to upload profile image
export const uploadProfileImage = createAsyncThunk(
  "profile/uploadProfileImage",
  async (imageFile, { rejectWithValue }) => {
    if (!checkAUTH()) {
      return rejectWithValue(createAuthError());
    }
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const accessToken = user?.accessToken;
        const requestBody = { img: imageFile };

        // Make API call to upload image with multipart/form-data
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

        // Return both object URL for immediate display and API response
        return {
          success: response.data.success,
          url: URL.createObjectURL(imageFile),
          message: response.data.errors
        };
      } catch (error) {
        if (error.response?.status === 401) {
           return rejectWithValue(createAuthError());
        }
        return rejectWithValue(getErrorMessage(error));
      }
  }
);

// Create profile slice with reducers and extra reducers for async actions
const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profileData: {},
    profileImage: null,
    loading: false,
    error: null,
    success: null,
    message: null, // For API response messages
  },
  reducers: {
    // Action to reset success/error states
    resetProfileStatus: (state) => {
      state.error = null;
      state.success = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Profile cases
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
          state.error = null;
          state.success = null;
          state.message = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profileData = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      })

      // Save Profile cases
      .addCase(saveProfile.pending, (state) => {
        state.loading = true;
          state.error = null;
          state.success = null;
          state.message = null;
      })
      .addCase(saveProfile.fulfilled, (state, action) => {
         state.loading = false;
        state.success = action.payload.success;
        state.message = action.payload.message;
        state.profileData = {
          ...action.payload.formData,
          profile_id: action.payload.formData.profile_id || 0,
        };
      })
      .addCase(saveProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      })

      // Fetch Profile Image cases
      .addCase(fetchProfileImage.pending, (state) => {
        state.loading = true;
          state.error = null;
          state.success = null;
          state.message = null;
      })
      .addCase(fetchProfileImage.fulfilled, (state, action) => {
        state.loading = false;
        state.profileImage = action.payload;
      })
      .addCase(fetchProfileImage.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      })

      // Upload Profile Image cases
      .addCase(uploadProfileImage.pending, (state) => {
        state.loading = true;
          state.error = null;
          state.success = null;
          state.message = null;
      })
      .addCase(uploadProfileImage.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
        state.message = action.payload.message;
        if (action.payload.success) {
          state.profileImage = action.payload.url;
        }
      })
      .addCase(uploadProfileImage.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      });
  },
});

// Export actions and reducer
export const { resetProfileStatus } = profileSlice.actions;
export default profileSlice.reducer;