// Import required libraries and functions
// useSelector helps get data from Redux store, useDispatch helps update the store
import { useSelector, useDispatch } from "react-redux";
// Link helps create clickable links to other pages
import { Link } from "react-router-dom";
// These functions help manage items in the cart
import { removeFromCart, updateQuantity } from "../redux/slices/cartSlice";
// toast shows popup messages to users
import { toast } from "react-toastify";

// This is the main Cart component that shows all items in shopping cart
function Cart() {
  // dispatch lets us send actions to Redux to update the store
  const dispatch = useDispatch();
  // Get cart items and user login status from Redux store
  const { items } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.auth);

  // This function runs when + or - buttons are clicked to change item quantity
  // It won't let quantity go below 1
  const handleQuantityChange = (id, quantity) => {
    if (quantity < 1) return;
    dispatch(updateQuantity({ id, quantity }));
  };

  // This function removes an item from cart when Remove button is clicked
  // It also shows a success message to the user
  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
    toast.success("Item removed from cart");
  };

  // This function adds up the total price of all items in cart
  // It multiplies each item's price by its quantity and adds them all together
  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // If cart is empty, show a message and a link to continue shopping
  if (items.length === 0) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <Link to="/" className="text-blue-500 hover:text-blue-600">
          Continue Shopping
        </Link>
      </div>
    );
  }

  // Main cart layout with items list and order summary
  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold mb-6">Your Cart</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left side - List of cart items */}
        <div className="lg:col-span-2">
          {/* Loop through each item in cart and show its details */}
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center border-b py-4 space-x-4"
            >
              {/* Item image */}
              <img
                src={item.image}
                alt={item.title}
                className="w-24 h-24 object-contain"
              />
              {/* Item details and controls */}
              <div className="flex-grow">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-gray-600">${item.price}</p>
                {/* Quantity controls and remove button */}
                <div className="flex items-center mt-2">
                  {/* Decrease quantity button */}
                  <button
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity - 1)
                    }
                    className="px-2 py-1 border"
                  >
                    -
                  </button>
                  {/* Current quantity */}
                  <span className="px-4">{item.quantity}</span>
                  {/* Increase quantity button */}
                  <button
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity + 1)
                    }
                    className="px-2 py-1 border"
                  >
                    +
                  </button>
                  {/* Remove item button */}
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="ml-4 text-red-500 hover:text-red-600"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right side - Order summary */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
            {/* Price breakdown */}
            <div className="space-y-2">
              {/* Subtotal amount */}
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${calculateTotal().toFixed(2)}</span>
              </div>
              {/* Shipping cost */}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              {/* Total amount */}
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
              </div>
            </div>
            {/* Show different buttons based on whether user is logged in */}
            {isAuthenticated ? (
              // If user is logged in, show checkout button
              <button className="w-full bg-blue-500 text-white py-2 rounded mt-4 hover:bg-blue-600">
                Proceed to Checkout
              </button>
            ) : (
              // If user is not logged in, show login button
              <Link
                to="/login"
                className="block w-full bg-blue-500 text-white py-2 rounded mt-4 hover:bg-blue-600 text-center"
              >
                Login to Checkout
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Make Cart component available for use in other files
export default Cart;
