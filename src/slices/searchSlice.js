import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// import api from "../api/axios";
const BROWSE_URL = process.env.REACT_APP_BROWSE_API_URL;

export const fetchSearchResults = createAsyncThunk(
  "search/fetchSearchResults",
  async ({ lang, searchTerm, curr_code }, { rejectWithValue }) => {
    try {
      const response = await axios.post(BROWSE_URL + "/GetSearchResult", {
        lang,
        searchTerm,
        curr_code,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState: {
    results: null,
    loading: false,
    error: null,
    searchTerm: "",
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    clearSearch: (state) => {
      state.results = null;
      state.searchTerm = "";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchResults.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload;
      })
      .addCase(fetchSearchResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSearchTerm, clearSearch } = searchSlice.actions;
export default searchSlice.reducer;
