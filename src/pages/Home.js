// Import necessary hooks and functions from React and Redux
import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
// Import actions to fetch products and categories
import { getProducts, getCategories } from "../redux/slices/productSlice";
// Import components needed for the home page
import ProductCard from "../components/product/ProductCard";
import ProductFilters from "../components/product/ProductFilters";
import ProductCardSkeleton from "../components/product/ProductCardSkeleton";
import SearchBar from "../components/search/SearchBar";

// Home component - Main page that displays product listings with filtering and search
function Home() {
  // Initialize Redux dispatch to trigger actions
  const dispatch = useDispatch();
  // Get products state from Redux store (items, loading state, error state, and filters)
  const { items, loading, error, filters } = useSelector(
    (state) => state.products
  );
  // State for pagination - tracks current page number
  const [currentPage, setCurrentPage] = useState(1);
  // Number of products to show per page
  const itemsPerPage = 9;
  // Get search parameters from URL
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  // Fetch products and categories when component mounts
  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());
  }, [dispatch]);

  // Memoized function to filter and sort products based on user selections
  const filterProducts = useMemo(() => {
    return items
      .filter((product) => {
        // Apply category filter
        const matchesCategory =
          !filters.category || product.category === filters.category;
        // Apply price range filter
        const matchesPrice =
          product.price >= filters.priceRange.min &&
          product.price <= filters.priceRange.max;
        // Apply search filter
        const matchesSearch = product.title
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        return matchesCategory && matchesPrice && matchesSearch;
      })
      .sort((a, b) => {
        // Sort products based on selected sorting option
        switch (filters.sortBy) {
          case "price-asc":
            return a.price - b.price;
          case "price-desc":
            return b.price - a.price;
          case "rating":
            return b.rating - a.rating;
          default:
            return 0;
        }
      });
  }, [items, filters, searchQuery]);

  // Get filtered products and calculate pagination
  const filteredProducts = filterProducts;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  // Get products for current page only
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Show error message if there's an error
  if (error) return <div>Error: {error}</div>;

  // Main layout of the home page
  return (
    <div className="container mx-auto px-4">
      {/* Search bar section */}
      <div className="mb-8">
        <SearchBar />
      </div>
      {/* Main grid layout for filters and products */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters sidebar */}
        <div className="lg:col-span-1">
          <ProductFilters />
        </div>
        {/* Products grid */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Show loading skeletons while loading, otherwise show products */}
            {loading
              ? Array(6)
                  .fill(null)
                  .map((_, index) => <ProductCardSkeleton key={index} />)
              : currentProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
          </div>
          {/* Pagination buttons - only show if there's more than one page */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8 space-x-2">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 rounded ${
                    currentPage === i + 1
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Export the Home component for use in other parts of the application
export default Home;
