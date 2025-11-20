import { CollectionPayload } from "@/app/types/collection";
import { formatEthPrice } from "@/app/utils/formatters";
import Image from "next/image";
import { memo } from "react";

const CompactCollectionCard = memo(
  ({
    collection,
    handleClick,
    className,
  }: {
    handleClick: () => void;
    className: string;
    collection: CollectionPayload;
  }) => {
    const displayfloor_price = formatEthPrice(collection.floor_price);

    return (
      <div
        className={`glass-card overflow-hidden cursor-pointer hover:-translate-y-1 transition-all duration-300 ${className}`}
        onClick={handleClick}
      >
        <div className="h-28 relative overflow-hidden">
          <Image
            fill
            src={collection?.banner_image || ""}
            alt={collection.name}
            sizes="100vw"
            className="object-cover"
          />
        </div>

        <div className="p-3 flex items-center  rounded-lg">
          <Image
            src={collection?.logo_image || ""}
            alt={collection.name}
            width={40}
            height={40}
            className="object-cover mr-3"
          />

          <div>
            <h3 className="font-medium text-xs  md:text-sm line-clamp-1">
              {collection.name}
            </h3>
            <div className="text-xs text-light/60">
              Floor: {displayfloor_price}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

CompactCollectionCard.displayName = "CompactCollectionCard";

export default CompactCollectionCard;
