// Import required dependencies from Redux Toolkit and API utilities
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProducts, fetchCategories } from "../../utils/api";

// Create async thunk for fetching all products
// This handles the asynchronous API call to get product data
export const getProducts = createAsyncThunk(
  "products/getProducts",
  async () => {
    const products = await fetchProducts();
    return products;
  }
);

// Create async thunk for fetching product categories
// This handles the asynchronous API call to get category data
export const getCategories = createAsyncThunk(
  "products/getCategories",
  async () => {
    const categories = await fetchCategories();
    return categories;
  }
);

// Create the products slice with initial state and reducers
const productSlice = createSlice({
  name: "products",
  // Define initial state for products
  initialState: {
    items: [], // Array to store product items
    categories: [], // Array to store product categories
    loading: false, // Loading state for API calls
    error: null, // Error message if API call fails
    filters: {
      category: "", // Selected category filter
      priceRange: { min: 0, max: 1000 }, // Price range filter
      sortBy: "price-asc", // Sort order
    },
  },
  // Define reducers for synchronous state updates
  reducers: {
    // Update filter settings
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    // Reset filters to default values
    clearFilters: (state) => {
      state.filters = {
        category: "",
        priceRange: { min: 0, max: 1000 },
        sortBy: "price-asc",
      };
    },
  },
  // Handle async thunk action states
  extraReducers: (builder) => {
    builder
      // When products fetch starts
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
      })
      // When products fetch succeeds
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      // When products fetch fails
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // When categories fetch succeeds
      .addCase(getCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      });
  },
});

// Export actions and reducer
export const { setFilters, clearFilters } = productSlice.actions;
export default productSlice.reducer;
