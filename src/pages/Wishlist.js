// Import necessary dependencies from React and Redux
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom"; // For navigation links
import { removeFromWishlist } from "../redux/slices/wishlistSlice"; // Action to remove items from wishlist
import CartButton from "../components/cart/CartButton"; // Component for adding items to cart
import { FaTrash } from "react-icons/fa"; // Trash icon for remove button
import { toast } from "react-toastify"; // For showing notification messages

// Wishlist component - Displays user's saved/wishlisted items
function Wishlist() {
  const dispatch = useDispatch(); // For dispatching Redux actions
  const { items } = useSelector((state) => state.wishlist); // Get wishlist items from Redux store

  // Handler function to remove item from wishlist
  const handleRemove = (id) => {
    dispatch(removeFromWishlist(id));
    toast.success("Item removed from wishlist");
  };

  // Show empty state message if wishlist is empty
  if (items.length === 0) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-bold mb-4">Your wishlist is empty</h2>
        <Link to="/" className="text-blue-500 hover:text-blue-600">
          Continue Shopping
        </Link>
      </div>
    );
  }

  // Main wishlist layout with grid of products
  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold mb-6">Your Wishlist</h2>
      {/* Grid layout for wishlist items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Map through each product in wishlist */}
        {items.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            {/* Product image with link to details */}
            <Link to={`/product/${product.id}`}>
              <div className="h-48 p-4">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-contain"
                />
              </div>
            </Link>
            {/* Product information section */}
            <div className="p-4">
              {/* Product title with link to details */}
              <Link to={`/product/${product.id}`}>
                <h3 className="font-semibold text-lg mb-2 hover:text-blue-500 truncate">
                  {product.title}
                </h3>
              </Link>
              {/* Product price */}
              <p className="text-gray-600 mb-4">${product.price}</p>
              {/* Action buttons container */}
              <div className="flex items-center justify-between">
                {/* Button to add item to cart */}
                <CartButton product={product} />
                {/* Button to remove item from wishlist */}
                <button
                  onClick={() => handleRemove(product.id)}
                  className="text-red-500 hover:text-red-600"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Export the Wishlist component for use in other files
export default Wishlist;
