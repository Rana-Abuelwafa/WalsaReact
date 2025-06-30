import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { checkAUTH } from "../helper/helperFN";
import { createAuthError } from "../utils/authError";
import { history } from "../index";
import axios from "axios";

// Base API URL from environment variables
const BASE_URL = process.env.REACT_APP_API_URL;

// Initial state for the profile slice
const initialState = {
  profileData: {}, // Stores user profile data
  profileImage: null, // Stores user profile image URL/path
  loading: false, // Loading state flag
  fetchError: null, // Error from fetching profile
  saveError: null, // Error from saving profile
  saveSuccess: false, // Success flag for saving profile
  fetchImageError: null, // Error from fetching image
  uploadImageError: null, // Error from uploading image
  uploadImageSuccess: false, // Success flag for uploading image
};

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
// Async thunk to fetch user profile data
export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async ({ accessToken, userId }, { rejectWithValue }) => {
     if (checkAUTH()) {

      try {
        // Make API call to get client profiles
        const response = await axios.post(
          BASE_URL + "/GetClientProfiles",
          {},
          getAuthHeaders()
        );

        // Find the profile matching the current user ID
        if (response.data && Array.isArray(response.data)) {
          const userProfile = response.data.find(
            (profile) => profile.client_id === userId
          );
          return userProfile || {}; // Return found profile or empty object
        }
        return {}; // Return empty object if no data
      } catch (error) {
        if (error.response?.status === 401) {
           return rejectWithValue(createAuthError());
        }
        return rejectWithValue(error.response?.data?.msg || error.msg);
      }
      } else {
      history.push("/login");
      window.location.reload();
      return null;
    }
    }
);

// Async thunk to save profile data
export const saveProfile = createAsyncThunk(
  "profile/saveProfile",
  async ({ accessToken, formData }, { rejectWithValue }) => {
    if (checkAUTH()) {
      try {
        // Make API call to save profile
        const response = await axios.post(
          BASE_URL + "/saveMainProfile",
          formData,
          getAuthHeaders()
        );
        // Return both API response and form data
        return {
          response: response.data,
          formData: formData,
        };
      } catch (error) {
        return rejectWithValue(error.response?.data?.msg || error.message);
      }
    } else {
      history.push("/login");
      window.location.reload();
      return null;
    }
  }
);

// Async thunk to fetch profile image
export const fetchProfileImage = createAsyncThunk(
  "profile/fetchProfileImage",
  async (accessToken, { rejectWithValue }) => {
    if (checkAUTH()) {
      try {
        // Make API call to get profile image
        const response = await axios.post(
          BASE_URL + "/GetProfileImage",
          {},
          getAuthHeaders()
        );
        // Handle array response and extract first image URL
        if (
          response.data &&
          Array.isArray(response.data) &&
          response.data.length > 0
        ) {
          console.log(response.data[0].img_path);
          return response.data[0].img_path || null;
        }
        return null;
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

// Async thunk to upload profile image
export const uploadProfileImage = createAsyncThunk(
  "profile/uploadProfileImage",
  async ({ accessToken, imageFile }, { rejectWithValue }) => {
    console.log("imageFile ", imageFile);
    if (checkAUTH()) {
      try {
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
          url: URL.createObjectURL(imageFile),
          apiResponse: response.data,
        };
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

// Create profile slice with reducers and extra reducers for async actions
const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    // Action to reset success/error states
    resetProfileStatus: (state) => {
      state.saveSuccess = false;
      state.saveError = null;
      state.uploadImageSuccess = false;
      state.uploadImageError = null;
    },
    // Action to clear fetch errors
    clearFetchErrors: (state) => {
      state.fetchError = null;
      state.fetchImageError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Profile cases
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.fetchError = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profileData = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.fetchError = action.payload;
      })

      // Save Profile cases
      .addCase(saveProfile.pending, (state) => {
        state.loading = true;
        state.saveError = null;
        state.saveSuccess = false;
      })
      .addCase(saveProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.saveSuccess = true;
        // Update profile data with new data and ID from response
        state.profileData = {
          ...action.payload.formData,
          profile_id:
            action.payload.response.idout || action.payload.formData.profile_id,
        };
      })
      .addCase(saveProfile.rejected, (state, action) => {
        state.loading = false;
        state.saveError = action.payload;
      })

      // Fetch Profile Image cases
      .addCase(fetchProfileImage.pending, (state) => {
        state.loading = true;
        state.fetchImageError = null;
      })
      .addCase(fetchProfileImage.fulfilled, (state, action) => {
        state.loading = false;
        state.profileImage = action.payload;
      })
      .addCase(fetchProfileImage.rejected, (state, action) => {
        state.loading = false;
        state.fetchImageError = action.payload;
      })

      // Upload Profile Image cases
      .addCase(uploadProfileImage.pending, (state) => {
        state.loading = true;
        state.uploadImageError = null;
        state.uploadImageSuccess = false;
      })
      .addCase(uploadProfileImage.fulfilled, (state, action) => {
        state.loading = false;
        state.uploadImageSuccess = true;
        state.profileImage = action.payload;
      })
      .addCase(uploadProfileImage.rejected, (state, action) => {
        state.loading = false;
        state.uploadImageError = action.payload;
      });
  },
});

// Export actions and reducer
export const { resetProfileStatus, clearFetchErrors } = profileSlice.actions;
export default profileSlice.reducer;
