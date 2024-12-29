import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice";
import { toast } from "react-toastify";

function CartButton({ product, quantity = 1 }) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity }));
    toast.success("Added to cart!");
  };

  return (
    <button
      onClick={handleAddToCart}
      className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
    >
      Add to Cart
    </button>
  );
}

export default CartButton;
