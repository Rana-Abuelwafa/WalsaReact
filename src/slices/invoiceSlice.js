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

// Helper function to extract error message from different response formats
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

      return {
        valid: response.data.valid,
        msg: response.data.msg,
        couponData: response.data.valid ? response.data : null,
      };
    } catch (err) {
      if (err.response?.status === 401) {
        return rejectWithValue(createAuthError());
      }
      return rejectWithValue({
        valid: false,
        msg: getErrorMessage(err),
      });
    }
  }
);

export const UpdateInvoicePrices = createAsyncThunk(
  "invoice/updatePrices",
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
      return {
        success: true,
        data: response.data,
      };
    } catch (err) {
      if (err.response?.status === 401) {
        return rejectWithValue(createAuthError());
      }
      return rejectWithValue({
        success: false,
        msg: getErrorMessage(err),
      });
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
      
      return {
        success: response.data.success,
        msg: response.data.success ? "Checkout successful" : response.data.errors,
      };
    } catch (err) {
      if (err.response?.status === 401) {
        return rejectWithValue(createAuthError());
      }
      return rejectWithValue({
        success: false,
        msg: getErrorMessage(err),
      });
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
      
      return {
        success: response.data.success,
        msg: response.data.success ? null : response.data.errors,
        invoice_id: invoiceData.invoice_id
      };
    } catch (err) {
      if (err.response?.status === 401) {
        return rejectWithValue(createAuthError());
      }
      return rejectWithValue({
        success: false,
        msg: getErrorMessage(err),
      });
    }
  }
);

export const getInvoices = createAsyncThunk(
  "invoice/getAll",
  async (getData, { rejectWithValue }) => {
    if (!checkAUTH()) {
      return rejectWithValue(createAuthError());
    }
    try {
      const response = await axios.post(
        `${BASE_URL}/GetInvoicesByClient`,
        getData,
        getAuthHeaders()
      );
      return response.data;
    } catch (err) {
      if (err.response?.status === 401) {
        return rejectWithValue(createAuthError());
      }
       return rejectWithValue({
        success: false,
        msg: getErrorMessage(err),
      });
    }
  }
);

const invoiceSlice = createSlice({
  name: "invoice",
  initialState: {
    loading: false,
    error: null,
    success: null,
    message: null,
    invoices: [],
    coupon: null,
  },
  reducers: {
    clearInvoiceState: (state) => {
      state.error = null;
      state.success = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    
    builder
      // Validate Coupon
      .addCase(validateCoupon.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
        state.message = null;
      })
      .addCase(validateCoupon.fulfilled, (state, action) => {
        state.loading = false;
        state.coupon = action.payload.valid ? action.payload.couponData : null;
        state.success = action.payload.valid;
        state.message = action.payload.msg;
      })
      .addCase(validateCoupon.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = true;
        state.message = action.payload?.msg || action.payload;
      })

      // Checkout Invoice
      .addCase(checkoutInvoice.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
        state.message = null;
      })
      .addCase(checkoutInvoice.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
        state.message = action.payload.msg;
        if (action.payload.success) {
          state.invoices = [];
        }
      })
      .addCase(checkoutInvoice.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = true;
        state.message = action.payload?.msg || action.payload;
      })

      // Remove Invoice
      .addCase(removeInvoice.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
        state.message = null;
      })
      .addCase(removeInvoice.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
        state.message = action.payload.msg;
        if (action.payload.success) {
          state.invoices = state.invoices.filter(
            (invoice) => invoice.invoice_id !== action.payload.invoice_id
          );
        }
      })
      .addCase(removeInvoice.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = true;
        state.message = action.payload?.msg || action.payload;
      })

      // Get Invoices
      .addCase(getInvoices.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
        state.message = null;
      })
      .addCase(getInvoices.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.invoices = action.payload;
      })
      .addCase(getInvoices.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = true;
        state.message = action.payload?.msg || action.payload;
      })
      
      // Update Invoice Prices
      .addCase(UpdateInvoicePrices.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
        state.message = null;
      })
      .addCase(UpdateInvoicePrices.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(UpdateInvoicePrices.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = true;
        state.message = action.payload?.msg || action.payload;
      });
  },
});

export const { clearInvoiceState } = invoiceSlice.actions;
export default invoiceSlice.reducer;