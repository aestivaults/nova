"use client";
import { useSetParams } from "@/app/hooks/useSetParams";
import Button from "@/app/components/ui/button";
import CollectionCard from "@/app/components/ui/CollectionCard";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { CollectionPayload } from "../types/collection";

export default function CollectionGrid({
  collections,
}: {
  collections: CollectionPayload[];
}) {
  const { navigate, setParams, searchParams } = useSetParams();
  const handleViewCollection = (id: string) => {
    navigate(`/collections/${id}`);
  };

  const [filteredCollections, setFilteredCollections] = useState(collections);

  const category = searchParams.get("category") || "all";
  const searchQuery = searchParams.get("query") || "";

  // Filter collections when category or search changes
  useEffect(() => {
    let filtered = collections;

    // Filter by category
    if (category !== "all") {
      filtered = filtered.filter(
        (collection) => collection.category === category
      );
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (collection) =>
          collection.name.toLowerCase().includes(query) ||
          collection.description.toLowerCase().includes(query) ||
          collection.creator.name.toLowerCase().includes(query)
      );
    }

    setFilteredCollections(filtered);
  }, [category, searchQuery, collections]);

  return (
    <>
      {filteredCollections && filteredCollections.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-6">
          {filteredCollections.map((collection) => (
            <CollectionCard
              key={collection._id}
              collection={collection}
              onClick={() => handleViewCollection(collection._id)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 glass-card">
          <div className="text-5xl text-light/20 mb-4">
            <Search className="max-w-xl mx-auto" size={35} />
          </div>
          <h3 className="text-xl font-medium mb-2">No Collections Found</h3>
          <p className="text-light/60 mb-6">
            We couldn&apos;t find any collections matching your search criteria.
          </p>
          <div className="flex justify-center gap-4">
            <Button
              variant="primary"
              onClick={() => {
                setParams({ query: null, category: "all" });
              }}
            >
              Reset Filters
            </Button>
            <Button
              variant="secondary"
              onClick={() => navigate("/create-collection")}
            >
              Create Collection
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
