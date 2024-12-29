// Import necessary dependencies from Redux for state management
import { useDispatch, useSelector } from "react-redux";
import { setFilters, clearFilters } from "../../redux/slices/productSlice";

// ProductFilters component handles filtering and sorting of products
function ProductFilters() {
  // Initialize dispatch to trigger Redux actions
  const dispatch = useDispatch();
  
  // Get categories and filters from Redux store
  const { categories } = useSelector((state) => state.products);
  const { filters } = useSelector((state) => state.products);

  // Handler for when user selects a category
  const handleCategoryChange = (category) => {
    dispatch(setFilters({ category }));
  };

  // Handler for when user changes sort option
  const handleSortChange = (e) => {
    dispatch(setFilters({ sortBy: e.target.value }));
  };

  // Handler for when user changes min/max price values
  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    dispatch(
      setFilters({
        priceRange: {
          ...filters.priceRange,
          [name]: Number(value), // Convert string value to number
        },
      })
    );
  };

  // Handler to reset all filters to default values
  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  return (
    <div className="space-y-6">
      {/* Category Filter Section */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <label key={category} className="flex items-center">
              <input
                type="radio"
                name="category"
                checked={filters.category === category}
                onChange={() => handleCategoryChange(category)}
                className="mr-2"
              />
              {category}
            </label>
          ))}
        </div>
      </div>

      {/* Price Range Filter Section */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Price Range</h3>
        <div className="space-y-2">
          <div>
            <label className="block text-sm">Min Price</label>
            <input
              type="number"
              name="min"
              value={filters.priceRange.min}
              onChange={handlePriceChange}
              className="w-full border rounded px-2 py-1"
            />
          </div>
          <div>
            <label className="block text-sm">Max Price</label>
            <input
              type="number"
              name="max"
              value={filters.priceRange.max}
              onChange={handlePriceChange}
              className="w-full border rounded px-2 py-1"
            />
          </div>
        </div>
      </div>

      {/* Sort Options Section */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Sort By</h3>
        <select
          value={filters.sortBy}
          onChange={handleSortChange}
          className="w-full border rounded px-2 py-1"
        >
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Rating</option>
        </select>
      </div>

      {/* Clear Filters Button */}
      <button
        onClick={handleClearFilters}
        className="w-full bg-gray-200 py-2 rounded hover:bg-gray-300"
      >
        Clear Filters
      </button>
    </div>
  );
}

export default ProductFilters;
