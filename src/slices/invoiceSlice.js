import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { checkAUTH } from "../helper/helperFN";
import { createAuthError } from "../utils/authError";
import { history } from "../index";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;

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

export const validateCoupon = createAsyncThunk(
  "invoice/validateCoupon",
  async (couponData, { rejectWithValue }) => {
    if (!checkAUTH()) {
      return rejectWithValue(createAuthError());
    }

    try {
      const response = await axios.post(
        `${BASE_URL}/ValidateClientCopoun`,
        couponData,
        getAuthHeaders()
      );
      return response.data;
    } catch (err) {
      if (err.response?.status === 401) {
        return rejectWithValue(createAuthError());
      }
      return rejectWithValue(err.response.message);
    }
  }
);
export const UpdateInvoicePrices = createAsyncThunk(
  "invoice/checkout",
  async (invoiceData, { rejectWithValue }) => {
    if (!checkAUTH()) {
      return rejectWithValue(createAuthError());
    }
    try {
      const response = await axios.post(
        `${BASE_URL}/UpdateInvoicePrices`,
        invoiceData,
        getAuthHeaders()
      );
      return response.data;
    } catch (err) {
      if (err.response?.status === 401) {
        return rejectWithValue(createAuthError());
      }
      return rejectWithValue(err.response.data);
    }
  }
);
export const checkoutInvoice = createAsyncThunk(
  "invoice/checkout",
  async (invoiceData, { rejectWithValue }) => {
    if (!checkAUTH()) {
      return rejectWithValue(createAuthError());
    }
    try {
      const response = await axios.post(
        `${BASE_URL}/CheckoutInvoice`,
        invoiceData,
        getAuthHeaders()
      );
      return response.data;
    } catch (err) {
      if (err.response?.status === 401) {
        return rejectWithValue(createAuthError());
      }
      return rejectWithValue(err.response.data);
    }
  }
);

export const removeInvoice = createAsyncThunk(
  "invoice/remove",
  async (invoiceData, { rejectWithValue }) => {
    if (!checkAUTH()) {
      return rejectWithValue(createAuthError());
    }
    try {
      const response = await axios.post(
        `${BASE_URL}/RemoveInvoice`,
        invoiceData,
        getAuthHeaders()
      );
      return response.data;
    } catch (err) {
      if (err.response?.status === 401) {
        return rejectWithValue(createAuthError());
      }
      return rejectWithValue(err.response.data);
    }
  }
);

export const getInvoices = createAsyncThunk(
  "invoice/getAll",
  async (formData, { rejectWithValue }) => {
    if (!checkAUTH()) {
      return rejectWithValue(createAuthError());
    }
    try {
      //const formData = { active: true, status: 1 };
      const response = await axios.post(
        `${BASE_URL}/GetInvoicesByClient`,
        formData,
        getAuthHeaders()
      );
      return response.data;
    } catch (err) {
      if (err.response?.status === 401) {
        return rejectWithValue(createAuthError());
      }
      return rejectWithValue(err.response.data);
    }
  }
);

const invoiceSlice = createSlice({
  name: "invoice",
  initialState: {
    loading: false,
    error: null,
    success: null,
    invoices: [],
    coupon: null,
  },
  reducers: {
    clearInvoiceState: (state) => {
      state.error = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(validateCoupon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(validateCoupon.fulfilled, (state, action) => {
        state.loading = false;
        state.coupon = action.payload[0];
        state.success = "Coupon applied successfully";
      })
      .addCase(validateCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to validate coupon";
      })
      .addCase(checkoutInvoice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkoutInvoice.fulfilled, (state, action) => {
        state.loading = false;
        state.invoices = [];
        state.success = "Checkout completed successfully";
      })
      .addCase(checkoutInvoice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Checkout failed";
      })
      .addCase(removeInvoice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeInvoice.fulfilled, (state, action) => {
        state.loading = false;
        state.invoices = state.invoices.filter(
          (invoice) => invoice.id !== action.payload.invoice_id
        );
        state.success = "Invoice removed successfully";
      })
      .addCase(removeInvoice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to remove invoice";
      })
      .addCase(getInvoices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getInvoices.fulfilled, (state, action) => {
        state.loading = false;
        state.invoices = action.payload;
      })
      .addCase(getInvoices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch invoices";
      });
  },
});

export const { clearInvoiceState } = invoiceSlice.actions;
export default invoiceSlice.reducer;
