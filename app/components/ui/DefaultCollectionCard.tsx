import { CollectionPayload } from "@/app/types/collection";
import { formatEthPrice, formatNumber } from "@/app/utils/formatters";
import { CheckCircle } from "lucide-react";
import Image from "next/image";
import { memo } from "react";
import Button from "./button";

export const DefaultCollectionCard = memo(
  ({
    collection,
    className,
    handleClick,
  }: {
    collection: CollectionPayload;
    className: string;
    handleClick: () => void;
  }) => {
    const displayVolume = formatEthPrice(collection.total_volume);

    const displayfloor_price = formatEthPrice(collection.floor_price);

    return (
      <div
        className={`glass-card overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-300 ${className}`}
        onClick={handleClick}
      >
        {/* Banner Image */}
        <div className="h-40 overflow-hidden relative">
          <Image
            fill
            src={collection.banner_image || ""}
            alt={collection.name}
            className="w-full h-full object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {collection.featured && (
            <div className="absolute top-2 left-2 bg-primary-500 text-light text-xs py-1 px-2 rounded-full">
              Featured
            </div>
          )}
        </div>

        {/* Logo and Name */}
        <div className="px-4 -mt-10 mb-4 relative">
          <div className="w-20  relative h-20 rounded-xl overflow-hidden border-4 border-darker shadow-lg">
            <Image
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              src={collection.logo_image}
              alt={collection.name}
              className="object-cover"
            />
          </div>
        </div>

        {/* Details */}
        <div className="px-4 pb-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-bold text-lg mb-1">{collection.name}</h3>
              {collection.creator && (
                <div className="flex items-center">
                  <span className="text-sm text-light/60 mr-1">by</span>
                  <div className="flex items-center">
                    <div className="relative overflow-hidden rounded-full mr-1 h-6 w-6">
                      <Image
                        src={collection.creator.avatar}
                        alt={collection.creator.name}
                        className="object-cover object-top-center"
                        sizes="32px"
                        fill
                      />
                    </div>

                    <span className="text-sm">{collection.creator.name}</span>
                    {collection.creator.isVerified && (
                      <CheckCircle className=" text-primary-500 ml-1 text-xs" />
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {collection.description && (
            <p className="text-sm text-light/70 mb-4 line-clamp-2">
              {collection.description}
            </p>
          )}

          <div className="hidden  sm:grid grid-cols-3 gap-2 mb-4">
            {collection.nfts.length !== undefined && (
              <div className="text-center bg-light/5 rounded-lg p-2">
                <p className="text-xs text-light/60">Items</p>
                <p className="font-medium">
                  {formatNumber(collection.nfts.length)}
                </p>
              </div>
            )}

            {collection.owners !== undefined ? (
              <div className="text-center bg-light/5 rounded-lg p-2">
                <p className="text-xs text-light/60">Owners</p>
                <p className="font-medium">
                  {formatNumber(collection.owners.length)}
                </p>
              </div>
            ) : (
              <div className="text-center bg-light/5 rounded-lg p-2">
                <p className="text-xs text-light/60">Volume</p>
                <p className="font-medium">{displayVolume}</p>
              </div>
            )}

            <div className="text-center bg-light/5 rounded-lg p-2">
              <p className="text-xs text-light/60">Floor</p>
              <p className="font-medium">{displayfloor_price}</p>
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="button" variant="primary">
              View Collection
            </Button>
          </div>
        </div>
      </div>
    );
  }
);

DefaultCollectionCard.displayName = "DefaultCollectionCard";
export default DefaultCollectionCard;
