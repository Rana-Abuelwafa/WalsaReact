import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const BASE_URL_AUTH = process.env.REACT_APP_AUTH_API_URL;
export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async ({ userId, oldPassword, newPassword, confirmNewPassword, accessToken }, { rejectWithValue }) => {
    try {
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
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json"
          }
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.msg || "Failed to change password. Please try again.");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    loading: false,
    error: null,
    success: null
  },
  reducers: {
    clearMessages: (state) => {
      state.error = null;
      state.success = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.success = "Password changed successfully!";
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to change password";
      });
  }
});

export const { clearMessages } = authSlice.actions;
export default authSlice.reducer;