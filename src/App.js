// Import necessary dependencies from react-router-dom for routing
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Import ToastContainer for showing notifications and its styles
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Import layout and page components
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Login from "./pages/Login";
import Register from "./pages/Register";
// Import PrivateRoute component for protected routes
import PrivateRoute from "./components/auth/PrivateRoute";

// Main App component that handles routing
function App() {
  return (
    // Router component wraps the entire app to enable routing
    <Router>
      {/* Layout component provides consistent page structure */}
      <Layout>
        {/* Routes component groups all route definitions */}
        <Routes>
          {/* Home page route - shown at root URL "/" */}
          <Route path="/" element={<Home />} />
          {/* Product details page - URL includes product ID as parameter */}
          <Route path="/product/:id" element={<ProductDetails />} />
          {/* Shopping cart page */}
          <Route path="/cart" element={<Cart />} />
          {/* Login page */}
          <Route path="/login" element={<Login />} />
          {/* Registration page */}
          <Route path="/register" element={<Register />} />
          {/* Wishlist page - protected by PrivateRoute, requires authentication */}
          <Route
            path="/wishlist"
            element={
              <PrivateRoute>
                <Wishlist />
              </PrivateRoute>
            }
          />
        </Routes>
        {/* ToastContainer for showing notification messages */}
        <ToastContainer />
      </Layout>
    </Router>
  );
}

// Export App component as default export
export default App;
