// Import configureStore from Redux Toolkit to create the Redux store
import { configureStore } from "@reduxjs/toolkit";
// Import reducers from each feature slice
import authReducer from "./slices/authSlice";      // Handles authentication state
import cartReducer from "./slices/cartSlice";      // Handles shopping cart state
import productReducer from "./slices/productSlice"; // Handles product catalog state
import wishlistReducer from "./slices/wishlistSlice"; // Handles wishlist state

// Create and configure the Redux store
// The store combines all reducers and enables state management across the app
export const store = configureStore({
  // Combine all reducers into a single root reducer
  reducer: {
    auth: authReducer,      // Authentication state slice
    cart: cartReducer,      // Shopping cart state slice 
    products: productReducer, // Products state slice
    wishlist: wishlistReducer, // Wishlist state slice
  },
});

// Export the store for use in the app
export default store;
