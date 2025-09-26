"use client";

import { useSetParams } from "@/app/hooks/useSetParams";
import CategoriesNavigation from "../components/ui/Categories";

function MarketFilterList() {
  const { setParams, searchParams } = useSetParams();

  const filters = {
    type: searchParams.get("type") || "all",
    category: searchParams.get("category") || "all",
    sortBy: searchParams.get("sortBy") || "newest",
  };

  const handleFilterChange = (
    key: string | number,
    value: string | number | number[]
  ) => {
    const serializedValue = Array.isArray(value) ? value.join(",") : value;
    setParams({ [key]: serializedValue });
  };

  return (
    <div className="py-20 md:px-2">
      <div className="glass-card md:p-6 md:mb-8 mb-3">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
          {/* Type Filter */}
          <div>
            <label className="form-label">Type</label>
            <div className="flex">
              {["all", "buyNow", "auction"].map((type, index) => (
                <button
                  key={type}
                  className={`flex-1 py-2 px-2 md:px-4 text-center ${
                    filters.type === type
                      ? "bg-primary-600 text-light"
                      : "bg-light/5 hover:bg-light/10"
                  } ${index === 0 ? "rounded-l-lg" : ""} ${
                    index === 2 ? "rounded-r-lg" : ""
                  } transition-colors`}
                  onClick={() => handleFilterChange("type", type)}
                >
                  {type === "buyNow"
                    ? "Buy Now"
                    : type[0].toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="form-label">Sort By</label>
            <select
              className="form-select"
              value={filters.sortBy}
              onChange={(e) => handleFilterChange("sortBy", e.target.value)}
            >
              {sortOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <CategoriesNavigation />
    </div>
  );
}

export default MarketFilterList;

const sortOptions = [
  { id: "newest", name: "Newest" },
  { id: "oldest", name: "Oldest" },
  { id: "priceLowToHigh", name: "Price: Low to High" },
  { id: "priceHighToLow", name: "Price: High to Low" },
  { id: "mostViewed", name: "Most Viewed" },
];
