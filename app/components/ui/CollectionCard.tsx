"use client";
import { CollectionPayload } from "@/app/types/collection";
import { memo, useCallback } from "react";
import CompactCollectionCard from "./CompactCollectionCard";
import DefaultCollectionCard from "./DefaultCollectionCard";
import FeaturedCollectionCard from "./FeaturedCollectionCard";

export const CollectionCard = memo(
  ({
    collection,
    onClick,
    variant = "default", // default, compact, featured
    className = "",
  }: {
    collection: CollectionPayload;
    onClick?: (collection: CollectionPayload) => void;
    className?: string;
    variant?: "default" | "compact" | "featured";
  }) => {
    const handleClick = useCallback(() => {
      if (onClick) {
        onClick(collection);
      }
    }, [collection, onClick]);

    // Compact variant (minimal info)
    if (variant === "compact") {
      return (
        <CompactCollectionCard
          handleClick={handleClick}
          className={className}
          collection={collection}
        />
      );
    }

    // Featured variant (large, with extra info)
    if (variant === "featured") {
      return (
        <FeaturedCollectionCard
          handleClick={handleClick}
          className={className}
          collection={collection}
        />
      );
    }

    // Default variant
    return (
      <DefaultCollectionCard
        handleClick={handleClick}
        className={className}
        collection={collection}
      />
    );
  }
);

CollectionCard.displayName = "CollectionCard";
export default CollectionCard;
