// productSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { checkAUTH } from "../helper/helperFN";
import { history } from "../index";
import axios from "axios";

// Base API URL from environment variables
const BASE_URL = process.env.REACT_APP_API_URL;

// Helper function to get authentication headers
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

// Helper function to update parent selection when child products are selected/deselected
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

  // Search for parent in the tree data
  findParent(state.treeData, productId);

  if (parentNode) {
    // Check if all children are selected
    const allChildrenSelected = parentNode.children.every((child) =>
      state.selectedProducts.includes(child.productId)
    );

    // Check if any children are selected
    const anyChildrenSelected = parentNode.children.some((child) =>
      state.selectedProducts.includes(child.productId)
    );

    // Update parent selection based on children's state
    if (
      allChildrenSelected &&
      !state.selectedProducts.includes(parentNode.productId)
    ) {
      // Add parent to selectedProducts if all children are selected
      state.selectedProducts.push(parentNode.productId);
    } else if (
      !allChildrenSelected &&
      state.selectedProducts.includes(parentNode.productId)
    ) {
      // Remove parent from selectedProducts if not all children are selected
      state.selectedProducts = state.selectedProducts.filter(
        (id) => id !== parentNode.productId
      );
    }

    // Optional: Track partial selection state for UI indicators
    parentNode.hasPartialSelection =
      anyChildrenSelected && !allChildrenSelected;
  }
};

// Helper function to extract selected products from tree structure
const getSelectedProductsFromTree = (treeData) => {
  const selectedProducts = [];

  // Recursive function to traverse the tree
  const traverse = (node) => {
    if (node.isSelected) {
      selectedProducts.push(node.productId);
    }
    if (node.children) {
      node.children.forEach((child) => traverse(child));
    }
  };

  // Start traversal from root nodes
  treeData.forEach((node) => traverse(node));
  return selectedProducts;
};

// Async thunk to fetch product tree data
export const fetchProductTree = createAsyncThunk(
  "products/fetchProductTree",
  async () => {
    if (checkAUTH()) {
      // Make API call to get product tree
      const response = await axios.post(
        `${BASE_URL}/GetProduct_Tree`,
        {},
        getAuthHeaders()
      );
      return response.data;
    } else {
      // Redirect to login if not authenticated
      history.push("/login");
      window.location.reload();
      return null;
    }
  }
);

// Async thunk to save selected products
export const saveSelectedProducts = createAsyncThunk(
  "products/saveSelectedProducts",
  async (changes, { dispatch, getState }) => {
    if (checkAUTH()) {
      try {
        const { added, removed } = changes;
        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user?.id;
        const state = getState();

        // Helper function to find product details by ID
        const findProductDetails = (productId) => {
          let result = null;
          const traverse = (node) => {
            if (node.productId === productId) {
              result = node;
              return;
            }
            if (node.children) {
              node.children.forEach((child) => traverse(child));
            }
          };
          state.products.treeData.forEach((node) => traverse(node));
          return result;
        };

        // Handle added products
        if (added.length > 0) {
          const addPayload = added.map((productId) => {
            const productDetails = findProductDetails(productId);
            return {
              productId,
              client_id: userId,
              id: productDetails?.clientServiceId || 0, // Use existing ID or default
              isSelected: true,
            };
          });

          // Save added products to server
          await axios.post(
            `${BASE_URL}/SaveClientServices`,
            addPayload,
            getAuthHeaders()
          );
        }

        // Handle removed products
        if (removed.length > 0) {
          const removePayload = removed.map((productId) => {
            const productDetails = findProductDetails(productId);
            return {
              productId,
              client_id: userId,
              id: productDetails?.clientServiceId || 0,
              isSelected: false,
            };
          });

          // Save removed products to server
          await axios.post(
            `${BASE_URL}/SaveClientServices`,
            removePayload,
            getAuthHeaders()
          );
        }

        // Refresh product tree after changes
        await dispatch(fetchProductTree());

        return changes;
      } catch (error) {
        throw new Error(
          error.response?.data?.message ||
            error.message ||
            "Failed to save products"
        );
      }
    } else {
      history.push("/login");
      window.location.reload();
      return null;
    }
  }
);

// Create product slice with initial state and reducers
const productSlice = createSlice({
  name: "products",
  initialState: {
    treeData: [], // Hierarchical product data
    selectedProducts: [], // Currently selected product IDs
    initialSelectedProducts: [], // Original selections for comparison
    loading: false, // Loading state
    error: null, // Error message
    lastSaved: null, // Timestamp of last successful save
  },
  reducers: {
    // Toggle product selection state
    toggleProductSelection: (state, action) => {
      const productId = action.payload;
      state.selectedProducts = state.selectedProducts.includes(productId)
        ? state.selectedProducts.filter((id) => id !== productId) // Remove if exists
        : [...state.selectedProducts, productId]; // Add if doesn't exist

      // Update parent selection hierarchy
      updateParentSelection(state, productId);
    },
    // Clear all selections
    clearSelections: (state) => {
      state.selectedProducts = [];
    },
    // Set initial selections (for comparison)
    setInitialSelections: (state, action) => {
      state.initialSelectedProducts = action.payload;
    },
  },
  // Handle async thunk actions
  extraReducers: (builder) => {
    builder
      // Product tree loading states
      .addCase(fetchProductTree.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductTree.fulfilled, (state, action) => {
        state.loading = false;
        state.treeData = action.payload;
        // Extract selected products from tree
        const selectedProducts = getSelectedProductsFromTree(action.payload);
        state.selectedProducts = selectedProducts;
        // Store initial selections
        state.initialSelectedProducts = [...selectedProducts];
      })
      .addCase(fetchProductTree.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Product save states
      .addCase(saveSelectedProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveSelectedProducts.fulfilled, (state, action) => {
        state.loading = false;
        // Update last saved timestamp
        state.lastSaved = new Date().toISOString();
        // Update initial selections to current state
        state.initialSelectedProducts = [...state.selectedProducts];
      })
      .addCase(saveSelectedProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Export actions and reducer
export const { toggleProductSelection, clearSelections, setInitialSelections } =
  productSlice.actions;
export default productSlice.reducer;
