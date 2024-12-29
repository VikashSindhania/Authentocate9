// Import required dependencies from Redux Toolkit and API utilities
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login as loginApi } from "../../utils/api";

// Create an async thunk for handling login API calls
// This allows us to handle asynchronous login operations with proper loading and error states
export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await loginApi(credentials);
      return response;
    } catch (error) {
      // If API call fails, return the error message
      return rejectWithValue(error.message);
    }
  }
);

// Define initial state for authentication
// Checks localStorage for existing user data to maintain login state across page refreshes
const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null, // User data or null if not logged in
  isAuthenticated: !!localStorage.getItem("user"), // Boolean flag for auth status
  loading: false, // Loading state for API calls
  error: null, // Error message if any
};

// Create the auth slice with reducers for managing authentication state
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Handle the start of login process
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    // Handle successful login
    loginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem("user", JSON.stringify(action.payload)); // Save user data to localStorage
    },
    // Handle login failure
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // Handle logout - clear user data and auth status
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("user"); // Remove user data from localStorage
    },
  },
  // Handle async thunk action states
  extraReducers: (builder) => {
    builder
      // When login request starts
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // When login is successful
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      // When login fails
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export actions and reducer
export const { loginStart, loginSuccess, loginFailure, logout } =
  authSlice.actions;
export default authSlice.reducer;
