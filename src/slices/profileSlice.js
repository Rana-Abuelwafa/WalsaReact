import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { checkAUTH } from "../helper/helperFN";
import { history } from "../index";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;

const initialState = {
  profileData: {},
  profileImage: null,
  loading: false,
  fetchError: null,
  saveError: null,
  saveSuccess: false,
  fetchImageError: null,
  uploadImageError: null,
  uploadImageSuccess: false
};

// Async thunks
export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async ({ accessToken, userId }, { rejectWithValue }) => {
    if (checkAUTH()) {
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
    } else {
      history.push("/login");
      window.location.reload();
      return null;
    }
  }
);

export const saveProfile = createAsyncThunk(
  "profile/saveProfile",
  async ({ accessToken, formData }, { rejectWithValue }) => {
    if (checkAUTH()) {
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
        return {
          response: response.data,
          formData: formData,
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

export const fetchProfileImage = createAsyncThunk(
  "profile/fetchProfileImage",
  async (accessToken, { rejectWithValue }) => {
    if (checkAUTH()) {
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
        // Handle the array response and extract the first image URL
        if (response.data && Array.isArray(response.data) && response.data.length > 0) {
           console.log(response.data[0].img_path)
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

export const uploadProfileImage = createAsyncThunk(
  "profile/uploadProfileImage",
  async ({ accessToken, imageFile }, { rejectWithValue }) => {
    if (checkAUTH()) {
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

        return {
            url: URL.createObjectURL(imageFile),
            apiResponse: response.data
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

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    resetProfileStatus: (state) => {
      state.saveSuccess = false;
      state.saveError = null;
      state.uploadImageSuccess = false;
      state.uploadImageError = null;
    },
    clearFetchErrors: (state) => {
      state.fetchError = null;
      state.fetchImageError = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Profile
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

      // Save Profile
      .addCase(saveProfile.pending, (state) => {
        state.loading = true;
        state.saveError = null;
        state.saveSuccess = false;
      })
      .addCase(saveProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.saveSuccess = true;
        state.profileData = {
          ...action.payload.formData,
          profile_id: action.payload.response.idout || action.payload.formData.profile_id
        };
      })
      .addCase(saveProfile.rejected, (state, action) => {
        state.loading = false;
        state.saveError = action.payload;
      })

      // Fetch Profile Image
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

      // Upload Profile Image
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
  }
});

export const { resetProfileStatus, clearFetchErrors } = profileSlice.actions;
export default profileSlice.reducer;