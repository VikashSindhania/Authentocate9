import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import { FaShoppingCart, FaHeart, FaUser } from "react-icons/fa";
import SearchBar from "../search/SearchBar";
import { useState } from "react";

// Main navigation component that appears at the top of every page
function Navbar() {
  // Redux dispatch function to trigger actions
  const dispatch = useDispatch();
  
  // Get authentication state and user info from Redux store
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  // Get cart items from Redux store
  const { items } = useSelector((state) => state.cart);

  // State for mobile menu toggle
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handler function for user logout
  const handleLogout = () => {
    console.log("Logout button clicked");
    dispatch(logout());
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between space-x-4">
          {/* Logo/Home link */}
          <Link to="/" className="text-xl font-bold">
            Home
            
          </Link>

          {/* Search component */}
          <SearchBar />

          {/* Navigation icons section */}
          <div className="flex items-center space-x-6">
            {/* Shopping cart icon with item count badge */}
            <Link to="/cart" className="relative">
              <FaShoppingCart className="text-xl" />
              {items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {items.length}
                </span>
              )}
            </Link>

            {/* Conditional rendering based on authentication status */}
            {isAuthenticated ? (
              // Show these elements when user is logged in
              <>
                <Link to="/wishlist">
                  <FaHeart className="text-xl" />
                </Link>
                {/* User profile dropdown */}
                <div className="relative group">
                  <button className="flex items-center space-x-1">
                    <FaUser className="text-xl" />
                    <span>{user.username}</span>
                  </button>
                  <div className="relative right-0 text-end mt-2 w-48 bg-white rounded-md shadow-lg z-50">
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100  group-hover:block"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              // Show login link when user is not authenticated
              <Link to="/login" className="text-blue-500 hover:text-blue-600">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
