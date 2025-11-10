import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { checkAUTH } from "../helper/helperFN";
import { createAuthError } from "../utils/authError";
// import axios from "axios";
import api from "../api/axios";
// Base URL for authentication API calls
const BASE_URL_AUTH = process.env.REACT_APP_AUTH_API_URL;

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

// Async thunk for changing password
export const changePassword = createAsyncThunk(
  "auth/changePassword", // action type prefix
  async (
    { userId, oldPassword, newPassword, confirmNewPassword, accessToken },
    { rejectWithValue }
  ) => {
    // Check if user is authenticated
    // if (!checkAUTH()) {
    //   return rejectWithValue(createAuthError());
    // }

    try {
      // Make POST request to change password endpoint
      const response = await api.post(
        BASE_URL_AUTH + "/changePassword",
        {
          userId,
          oldPassword,
          newPassword,
          confirmNewPassword,
        },
        getAuthHeaders()
      );

      if (response.data.isSuccessed === false) {
        return rejectWithValue(response.data.msg);
      }
      return response.data; // Return response data on success
    } catch (error) {
      // if (error.response?.status === 401) {
      //   return rejectWithValue(createAuthError());
      // }

      if (error.response?.status === 400) {
        return rejectWithValue(
          error.response.data?.msg ||
            error.message ||
            "Invalid request. Please check your input."
        );
      }

      return rejectWithValue(
        error.response?.data?.msg ||
          error.message ||
          "Failed to change password. Please try again."
      );
    }
  }
);

// Create auth slice with initial state and reducers
const authSlice = createSlice({
  name: "auth", // slice name
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null, // Get user from localStorage if available
    loading: false, // Loading state
    error: null, // Error message
    success: null, // Success message
    message: null,
  },
  reducers: {
    // Reducer to clear error/success messages
    clearMessages: (state) => {
      state.error = null;
      state.success = null;
      state.message = null;
    },
  },
  // Handle async thunk actions
  extraReducers: (builder) => {
    builder
      // Password change pending state
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
        state.message = null;
      })
      // Password change successful
      .addCase(changePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.msg;
      })
      // Password change failed
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = true;
        state.message = action?.payload;
      });
  },
});

// Export actions and reducer
export const { clearMessages } = authSlice.actions;
export default authSlice.reducer;
