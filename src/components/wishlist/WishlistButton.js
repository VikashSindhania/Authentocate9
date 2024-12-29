import { useDispatch, useSelector } from "react-redux";
import { FaHeart } from "react-icons/fa";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../redux/slices/wishlistSlice";
import { toast } from "react-toastify";

function WishlistButton({ product }) {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.wishlist);
  const isInWishlist = items.some((item) => item.id === product.id);

  const handleWishlistClick = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id));
      toast.success("Removed from wishlist");
    } else {
      dispatch(addToWishlist(product));
      toast.success("Added to wishlist");
    }
  };

  return (
    <button
      onClick={handleWishlistClick}
      className={`p-2 rounded-full ${
        isInWishlist ? "text-red-500" : "text-gray-400"
      } hover:text-red-500`}
    >
      <FaHeart className="text-xl" />
    </button>
  );
}

export default WishlistButton;
