import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { checkAUTH } from "../helper/helperFN";
import { createAuthError } from "../utils/authError";
import axios from "axios";

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

export const sendContactMail = createAsyncThunk(
  "contact/sendMail",
  async ({ subject, message }, { rejectWithValue }) => {
    if (!checkAUTH()) {
      return rejectWithValue(createAuthError());
    }

    try {
      const response = await axios.post(
        BASE_URL + "/SendContactMail",
        { subject, message },
        getAuthHeaders()
      );
      
      if (response.data !== true) {
        return rejectWithValue("Failed to send message");
      }
      return true;
    } catch (error) {
      if (error.response?.status === 401) {
        return rejectWithValue(createAuthError());
      }
      return rejectWithValue(error.response?.data?.errors || error.message);
    }
  }
);

const contactSlice = createSlice({
  name: "contact",
  initialState: {
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetContactState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendContactMail.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(sendContactMail.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(sendContactMail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { resetContactState } = contactSlice.actions;
export default contactSlice.reducer;