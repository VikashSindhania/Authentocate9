// Import necessary hooks from React and React Router
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// Import Redux hook to access store state
import { useSelector } from "react-redux";
// Import API utility function
import { fetchProduct } from "../utils/api";
// Import custom components for cart and wishlist functionality
import CartButton from "../components/cart/CartButton";
import WishlistButton from "../components/wishlist/WishlistButton";

// ProductDetails component - Displays detailed information about a specific product
function ProductDetails() {
  // Get product ID from URL parameters
  const { id } = useParams();
  // State for storing product data
  const [product, setProduct] = useState(null);
  // State for tracking loading status
  const [loading, setLoading] = useState(true);
  // State for storing any error messages
  const [error, setError] = useState(null);
  // State for tracking selected quantity
  const [quantity, setQuantity] = useState(1);
  // Get authentication status from Redux store
  const { isAuthenticated } = useSelector((state) => state.auth);

  // Effect hook to fetch product data when component mounts or ID changes
  useEffect(() => {
    const getProduct = async () => {
      try {
        setLoading(true);
        const data = await fetchProduct(id);
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, [id]);

  // Show loading state while fetching data
  if (loading) return <div>Loading...</div>;
  // Show error message if fetch failed
  if (error) return <div>Error: {error}</div>;
  // Show not found message if no product data
  if (!product) return <div>Product not found</div>;

  // Main product details layout
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product image section */}
        <div className="flex justify-center items-center bg-white p-8 rounded-lg">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-96 object-contain"
          />
        </div>
        {/* Product information section */}
        <div>
          {/* Product title */}
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          {/* Product price */}
          <p className="text-2xl text-blue-600 mb-4">${product.price}</p>
          {/* Product description */}
          <div className="mb-6">
            <h2 className="font-semibold mb-2">Description</h2>
            <p className="text-gray-600">{product.description}</p>
          </div>
          {/* Product category */}
          <div className="mb-6">
            <h2 className="font-semibold mb-2">Category</h2>
            <p className="text-gray-600 capitalize">{product.category}</p>
          </div>
          {/* Quantity selector */}
          <div className="flex items-center space-x-4 mb-6">
            <label className="font-semibold">Quantity:</label>
            <div className="flex items-center border rounded">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-1 border-r"
              >
                -
              </button>
              <span className="px-4">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-1 border-l"
              >
                +
              </button>
            </div>
          </div>
          {/* Cart and wishlist buttons */}
          <div className="flex items-center space-x-4">
            <CartButton product={product} quantity={quantity} />
            {/* Only show wishlist button if user is logged in */}
            {isAuthenticated && <WishlistButton product={product} />}
          </div>
        </div>
      </div>
    </div>
  );
}

// Export the component for use in other parts of the application
export default ProductDetails;
