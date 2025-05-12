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


const updateParentSelection = (state, productId) => {
    // Find the parent node of the changed product
    let parentNode = null;
    const findParent = (nodes, targetId) => {
      for (const node of nodes) {
        if (node.children) {
          for (const child of node.children) {
            if (child.productId === targetId) {
              parentNode = node;
              return;
            }
          }
          findParent(node.children, targetId);
        }
      }
    };
    
    findParent(state.treeData, productId);
    
    if (parentNode) {
      // Check if all children are selected
      const allChildrenSelected = parentNode.children.every(child => 
        state.selectedProducts.includes(child.productId)
      );
      
      // Check if any children are selected
      const anyChildrenSelected = parentNode.children.some(child => 
        state.selectedProducts.includes(child.productId)
      );
      
      // Update parent selection based on children
      if (allChildrenSelected && !state.selectedProducts.includes(parentNode.productId)) {
        // Add parent to selectedProducts if all children are selected
        state.selectedProducts.push(parentNode.productId);
      } else if (!allChildrenSelected && state.selectedProducts.includes(parentNode.productId)) {
        // Remove parent from selectedProducts if not all children are selected
        state.selectedProducts = state.selectedProducts.filter(id => id !== parentNode.productId);
      }
      
      // Handle partial selection (optional visual indicator)
      // You might want to add this to your node data if you want to show "indeterminate" state
      parentNode.hasPartialSelection = anyChildrenSelected && !allChildrenSelected;
    }
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
          const state = getState();
          
          // Helper function to find product details including id
          const findProductDetails = (productId) => {
            let result = null;
            const traverse = (node) => {
              if (node.productId === productId) {
                result = node;
                return;
              }
              if (node.children) {
                node.children.forEach(child => traverse(child));
              }
            };
            state.products.treeData.forEach(node => traverse(node));
            return result;
          };
  
          // Handle additions
          if (added.length > 0) {
            const addPayload = added.map(productId => {
              const productDetails = findProductDetails(productId);
              return {
                productId,
                client_id: userId,
                id: productDetails?.clientServiceId || 0, 
                isSelected: true
              };
            });
            
            await axios.post(
              `${BASE_URL}/SaveClientServices`, 
              addPayload,
              getAuthHeaders()
            );
          }
          
          // Handle removals
          if (removed.length > 0) {
            const removePayload = removed.map(productId => {
              const productDetails = findProductDetails(productId);
              return {
                productId,
                client_id: userId,
                id: productDetails?.clientServiceId || 0, // Use the actual id if available
                isSelected: false
              };
            });
            
            await axios.post(
              `${BASE_URL}/SaveClientServices`,
              removePayload,
              getAuthHeaders()
            );
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
    initialSelectedProducts: [], 
    loading: false,
    error: null,
    lastSaved: null
  },
  reducers: {
   toggleProductSelection: (state, action) => {
        const productId = action.payload;
        state.selectedProducts = state.selectedProducts.includes(productId)
            ? state.selectedProducts.filter(id => id !== productId) // Remove if exists
            : [...state.selectedProducts, productId]; // Add if doesn't exist
        
        // Update parent selection when a child is toggled
        updateParentSelection(state, productId);
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
        state.initialSelectedProducts = [...selectedProducts]; 
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