"use client";
import { useSetParams } from "@/app/hooks/useSetParams";
import CategoriesNavigation from "../components/ui/Categories";
import { Search } from "lucide-react";

export default function FilterCollection() {
  const { setParams, searchParams } = useSetParams();
  const searchQuery = searchParams.get("query") || "";

  return (
    <div className="flex flex-col md:grid grid-cols-3 justify-between items-center mb-6 gap-4">
      {/* Categories */}
      <CategoriesNavigation />

      {/* Search */}
      <div className="w-full md:w-64 lg:w-80">
        <div className="relative">
          <input
            type="text"
            className="form-input pr-10"
            placeholder="Search collections..."
            value={searchQuery}
            onChange={(e) => setParams({ query: e.target.value })}
          />

          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <Search className="text-light/40" />
          </div>
        </div>
      </div>
    </div>
  );
}
