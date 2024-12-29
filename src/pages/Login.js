// Import necessary hooks and libraries
import { useState } from "react"; // For managing form state
import { useDispatch, useSelector } from "react-redux"; // For Redux state management
import { useNavigate } from "react-router-dom"; // For programmatic navigation
import { toast } from "react-toastify"; // For showing notification messages
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../redux/slices/authSlice"; // Import auth actions

// Login component - Handles user authentication
function Login() {
  // State to store form input values
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const dispatch = useDispatch(); // For dispatching Redux actions
  const navigate = useNavigate(); // For navigating between pages
  const { loading, error } = useSelector((state) => state.auth); // Get auth state from Redux

  // Handle input changes in form fields
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    dispatch(loginStart()); // Dispatch login start action

    try {
      // In a real app, you would make an API call here
      // For demo purposes, we'll simulate a successful login
      const mockUser = {
        id: 1,
        username: formData.username,
        email: `${formData.username}@example.com`,
      };

      dispatch(loginSuccess(mockUser)); // Update state with user data
      toast.success("Login successful!"); // Show success message
      navigate("/"); // Redirect to home page
    } catch (error) {
      dispatch(loginFailure(error.message)); // Update state with error
      toast.error(error.message); // Show error message
    }
  };

  // Login form UI
  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Username input field */}
        <div>
          <label className="block mb-1">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        {/* Password input field */}
        <div>
          <label className="block mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        {/* Show error message if there is one */}
        {error && <div className="text-red-500">{error}</div>}
        {/* Submit button - disabled while loading */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

// Export the Login component for use in other files
export default Login;
