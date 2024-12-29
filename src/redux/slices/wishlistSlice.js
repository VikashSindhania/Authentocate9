// Import createSlice from Redux Toolkit to create a Redux slice
import { createSlice } from "@reduxjs/toolkit";

// Initial state of the wishlist
// - items: Array of wishlist items retrieved from localStorage, defaults to empty array if none exists
// - loading: Tracks loading state for async operations
// - error: Stores any error messages
const initialState = {
  items: JSON.parse(localStorage.getItem("wishlist")) || [],
  loading: false,
  error: null,
};

// Create a Redux slice for wishlist functionality
const wishlistSlice = createSlice({
  name: "wishlist", // Name of the slice
  initialState, // Initial state defined above
  reducers: {
    // Add an item to wishlist if it doesn't already exist
    addToWishlist: (state, action) => {
      if (!state.items.find((item) => item.id === action.payload.id)) {
        state.items.push(action.payload); // Add new item to array
        localStorage.setItem("wishlist", JSON.stringify(state.items)); // Save to localStorage
      }
    },
    // Remove an item from wishlist by its ID
    removeFromWishlist: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      localStorage.setItem("wishlist", JSON.stringify(state.items)); // Update localStorage
    },
    // Clear all items from wishlist
    clearWishlist: (state) => {
      state.items = []; // Empty the items array
      localStorage.removeItem("wishlist"); // Remove from localStorage
    },
  },
});

// Export the action creators for use in components
export const { addToWishlist, removeFromWishlist, clearWishlist } =
  wishlistSlice.actions;
// Export the reducer for store configuration
export default wishlistSlice.reducer;
