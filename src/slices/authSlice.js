import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { checkAUTH } from "../helper/helperFN";
import { history } from "../index";
import axios from "axios";

// Base URL for authentication API calls
const BASE_URL_AUTH = process.env.REACT_APP_AUTH_API_URL;

// Async thunk for changing password
export const changePassword = createAsyncThunk(
  "auth/changePassword",  // action type prefix
  async ({ userId, oldPassword, newPassword, confirmNewPassword, accessToken }, { rejectWithValue }) => {
     // Check if user is authenticated
     if (checkAUTH()) {
          try {
            // Make POST request to change password endpoint
            const response = await axios.post(
              BASE_URL_AUTH + "/changePassword",
              {
                userId,
                oldPassword,
                newPassword,
                confirmNewPassword
              },
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,  // Include access token in headers
                  "Content-Type": "application/json"
                }
              }
            );
            return response.data;  // Return response data on success
          } catch (error) {
            // Return error message if request fails
            return rejectWithValue(error.response?.data?.msg || "Failed to change password. Please try again.");
          }
        } else {
            // Redirect to login if not authenticated
            history.push("/login");
            window.location.reload();
            return null;
        }  
  }
);

// Create auth slice with initial state and reducers
const authSlice = createSlice({
  name: "auth",  // slice name
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,  // Get user from localStorage if available
    loading: false,  // Loading state
    error: null,     // Error message
    success: null    // Success message
  },
  reducers: {
    // Reducer to clear error/success messages
    clearMessages: (state) => {
      state.error = null;
      state.success = null;
    }
  },
  // Handle async thunk actions
  extraReducers: (builder) => {
    builder
      // Password change pending state
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      // Password change successful
      .addCase(changePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.success = "Password changed successfully!";
      })
      // Password change failed
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to change password";
      });
  }
});

// Export actions and reducer
export const { clearMessages } = authSlice.actions;
export default authSlice.reducer;