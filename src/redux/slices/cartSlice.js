// Import createSlice from Redux Toolkit to create a Redux slice
import { createSlice } from "@reduxjs/toolkit";

// Define initial state for cart
// - items: Array of cart items retrieved from localStorage, or empty array if none exist
// - loading: Boolean flag for loading states
// - error: Stores any error messages
const initialState = {
  items: JSON.parse(localStorage.getItem("cart")) || [],
  loading: false,
  error: null,
};

// Create cart slice with reducers for managing cart state
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Add item to cart
    // If item exists, increase quantity
    // If item is new, add it to cart
    addToCart: (state, action) => {
      const { id, quantity = 1 } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ ...action.payload, quantity });
      }
      // Save updated cart to localStorage
      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    // Remove item from cart by filtering out the item with matching id
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      // Save updated cart to localStorage
      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    // Update quantity of specific item in cart
    // Find item by id and set its new quantity
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        item.quantity = quantity;
      }
      // Save updated cart to localStorage
      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    // Clear all items from cart and remove cart data from localStorage
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("cart");
    },
  },
});

// Export cart actions for use in components
export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;
// Export cart reducer for store configuration
export default cartSlice.reducer;
