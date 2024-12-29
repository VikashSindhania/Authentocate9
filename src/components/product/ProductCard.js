import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import CartButton from "../cart/CartButton";
import WishlistButton from "../wishlist/WishlistButton";

function ProductCard({ product }) {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Link to={`/product/${product.id}`}>
        <div className="h-48 p-4">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-contain"
          />
        </div>
      </Link>
      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-lg mb-2 hover:text-blue-500 truncate">
            {product.title}
          </h3>
        </Link>
        <p className="text-gray-600 mb-2">${product.price}</p>
        <div className="flex items-center justify-between">
          <CartButton product={product} />
          {isAuthenticated && <WishlistButton product={product} />}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
