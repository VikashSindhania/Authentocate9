// SearchBar component - Handles product search functionality
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  // State to store the search query
  const [query, setQuery] = useState("");
  
  // Hook for programmatic navigation
  const navigate = useNavigate();

  // Handler for search form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Only navigate if there's a non-empty search query
    if (query.trim()) {
      // Navigate to search results page with query parameter
      navigate(`/?search=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex-1 max-w-xl mx-4">
      <div className="relative">
        {/* Search input field */}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products..."
          className="w-full px-4 py-2 rounded-full border focus:outline-none focus:border-blue-500"
        />
        {/* Search submit button */}
        <button
          type="submit"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          <FaSearch />
        </button>
      </div>
    </form>
  );
}

export default SearchBar;
