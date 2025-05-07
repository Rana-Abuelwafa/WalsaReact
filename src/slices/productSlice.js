// productSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { checkAUTH } from "../helper/helperFN";
import { history } from "../index";
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL;

const getAuthHeaders = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const accessToken = user?.accessToken;
  const userId = user?.id;
  return {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }
  };
};

const getSelectedProductsFromTree = (treeData) => {
  const selectedProducts = [];
  
  const traverse = (node) => {
    if (node.isSelected) {
      selectedProducts.push(node.productId);
    }
    if (node.children) {
      node.children.forEach(child => traverse(child));
    }
  };
  
  treeData.forEach(node => traverse(node));
  return selectedProducts;
};

export const fetchProductTree = createAsyncThunk(
  'products/fetchProductTree',
  async () => {
    if (checkAUTH()) {
    const response = await axios.post(
      `${BASE_URL}/GetProduct_Tree`,
      {},
      getAuthHeaders());
    return response.data;
} else {
    history.push("/login");
    window.location.reload();
    return null;
  }
  }
);

export const saveSelectedProducts = createAsyncThunk(
    'products/saveSelectedProducts',
    async (changes, { dispatch, getState }) => {
        if (checkAUTH()) {
      try {
        const { added, removed } = changes;
        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user?.id;
        
        // Handle additions
        if (added.length > 0) {
          const addPayload = added.map(productId => ({
            productId,
            client_id: userId,
            id: 0
          }));
          
          await axios.post(
            `${BASE_URL}/SaveClientServices`, 
            addPayload,
            getAuthHeaders()
          );
        }
        
        // Handle removals (if your API supports it)
        if (removed.length > 0) {
        //   await axios.post(
        //     `${BASE_URL}/RemoveClientServices`,
        //     { productIds: removed, client_id: userId },
        //     getAuthHeaders()
        //   );
        }
        
        // Fetch fresh data after successful save
        await dispatch(fetchProductTree());
        
        return changes;
      } catch (error) {
        throw new Error(error.response?.data?.message || error.message || 'Failed to save products');
      }
    } else {
        history.push("/login");
        window.location.reload();
        return null;
      }
    }
  );


const productSlice = createSlice({
  name: 'products',
  initialState: {
    treeData: [],
    selectedProducts: [],
    initialSelectedProducts: [], // Track initially selected products
    loading: false,
    error: null,
    lastSaved: null
  },
  reducers: {
    toggleProductSelection: (state, action) => {
      const productId = action.payload;
      const index = state.selectedProducts.indexOf(productId);
      if (index === -1) {
        state.selectedProducts.push(productId);
      } else {
        state.selectedProducts.splice(index, 1);
      }
    },
    clearSelections: (state) => {
      state.selectedProducts = [];
    },
    setInitialSelections: (state, action) => {
      state.initialSelectedProducts = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductTree.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductTree.fulfilled, (state, action) => {
        state.loading = false;
        state.treeData = action.payload;
        const selectedProducts = getSelectedProductsFromTree(action.payload);
        state.selectedProducts = selectedProducts;
        state.initialSelectedProducts = [...selectedProducts]; // Set initial selections
      })
      .addCase(fetchProductTree.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(saveSelectedProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveSelectedProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.lastSaved = new Date().toISOString();
        // Update initial selections to current selections after save
        state.initialSelectedProducts = [...state.selectedProducts];
      })
      .addCase(saveSelectedProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { toggleProductSelection, clearSelections, setInitialSelections } = productSlice.actions;
export default productSlice.reducer;