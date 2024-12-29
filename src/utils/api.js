// Import axios for making HTTP requests to the API
import axios from "axios";

// Create an axios instance with base configuration
// This allows us to reuse the same base URL for all API calls
const api = axios.create({
  baseURL: "https://fakestoreapi.com", // The base URL for all API requests
});

// Fetch all products from the API
// Returns an array of product objects
export const fetchProducts = async () => {
  const response = await api.get("/products");
  return response.data;
};

// Fetch a single product by its ID
// @param {number} id - The ID of the product to fetch
// Returns a single product object
export const fetchProduct = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

// Fetch all product categories
// Returns an array of category strings
export const fetchCategories = async () => {
  const response = await api.get("/products/categories");
  return response.data;
};


// Returns a Promise that resolves with mock user data after 1 second delay
export const login = async (credentials) => {
  // Simulate API call with artificial delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: 1,
        username: credentials.username,
        email: `${credentials.username}@example.com`,
        token: "mock_token_12345", // Mock authentication token
      });
    }, 1000); // 1 second delay to simulate network request
  });
};

// Export the configured axios instance for use in other files
export default api;
