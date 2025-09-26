"use client";
import CollectionCard from "../components/ui/CollectionCard";
import { useSetParams } from "../hooks/useSetParams";
import { CollectionPayload } from "../types/collection";

export default function ExploreCollectionList({
  collections,
}: {
  collections: CollectionPayload[];
}) {
  const { navigate } = useSetParams();
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {collections.slice(0, 6).map((collection) => (
        <CollectionCard
          key={collection._id}
          collection={collection}
          onClick={() => navigate(`/collections/${collection._id}`)}
        />
      ))}
    </div>
  );
}
