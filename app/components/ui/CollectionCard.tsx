"use client";
import { formatEthPrice, formatNumber } from "@/app/utils/formatters";
import Button from "./button";
import { CollectionPayload } from "@/app/types/collection";
import { CheckCircle } from "lucide-react";
import Image from "next/image";

export default function CollectionCard({
  collection,
  onClick,
  variant = "default", // default, compact, featured
  className = "",
}: {
  collection: CollectionPayload;
  onClick?: (collection: CollectionPayload) => void;
  className?: string;
  variant?: "default" | "compact" | "featured";
}) {
  // Format the collection data for display
  const displayfloor_price = formatEthPrice(collection.floor_price);

  const displayVolume = formatEthPrice(collection.total_volume);

  // Handle click
  const handleClick = () => {
    if (onClick) {
      onClick(collection);
    }
  };

  // Compact variant (minimal info)
  if (variant === "compact") {
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
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        </div>

        <div className="p-3 flex items-center">
          <div className="w-10 h-10 relative rounded-lg overflow-hidden mr-3">
            <Image
              fill
              src={collection?.logo_image || ""}
              alt={collection.name}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />
          </div>

          <div>
            <h3 className="font-medium text-sm line-clamp-1">
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

  // Featured variant (large, with extra info)
  if (variant === "featured") {
    return (
      <div className={`mb-6 ${className}`}>
        <div
          className="glass-card overflow-hidden cursor-pointer"
          onClick={handleClick}
        >
          <div className="relative h-60 md:h-72">
            <Image
              src={collection.banner_image || ""}
              alt={collection.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent"></div>

            <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col md:flex-row md:items-end">
              <div className="flex items-center mb-4 md:mb-0 md:mr-6">
                <div className="w-20 relative h-20 rounded-xl overflow-hidden border-4 border-darker shadow-lg">
                  <Image
                    src={collection.logo_image}
                    alt={collection.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className=" object-cover"
                  />
                </div>
              </div>

              <div className="md:flex-1">
                <h2 className="text-2xl font-bold mb-2">{collection.name}</h2>

                {collection.creator && (
                  <div className="flex items-center mb-4">
                    <span className="text-light/60 mr-2">by</span>
                    <div className="flex items-center">
                      <Image
                        height={30}
                        width={30}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        src={collection.creator.avatar}
                        alt={collection.creator.name}
                        className="rounded-full mr-2"
                      />

                      <span>{collection.creator.name}</span>
                      {collection.creator.isVerified && (
                        <CheckCircle className="text-primary-500 ml-1 text-xs" />
                      )}
                    </div>
                  </div>
                )}

                {collection.description && (
                  <p className="text-light/70 mb-4 max-w-2xl line-clamp-2 md:line-clamp-1">
                    {collection.description}
                  </p>
                )}
              </div>

              <div className="flex md:gap-8 gap-4">
                {collection.nfts.length !== undefined && (
                  <div className="text-center">
                    <p className="text-xl font-bold">
                      {formatNumber(collection.nfts.length)}
                    </p>
                    <p className="text-light/60 text-sm">Items</p>
                  </div>
                )}

                {collection.owners !== undefined && (
                  <div className="text-center">
                    <p className="text-xl font-bold">
                      {formatNumber(collection.owners.length)}
                    </p>
                    <p className="text-light/60 text-sm">Owners</p>
                  </div>
                )}

                <div className="text-center">
                  <p className="text-xl font-bold">{displayfloor_price}</p>
                  <p className="text-light/60 text-sm">Floor</p>
                </div>
              </div>
            </div>

            {collection.featured && (
              <div className="absolute top-4 left-4 bg-primary-500 text-light text-xs py-1 px-2 rounded-full">
                Featured
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Default variant
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
                  <Image
                    height={20}
                    width={20}
                    src={collection.creator.avatar}
                    alt={collection.creator.name}
                    className="rounded-full mr-1"
                  />

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

        <div className="grid grid-cols-3 gap-2 mb-4">
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
          <Button type="button" variant="primary" size="small">
            View Collection
          </Button>
        </div>
      </div>
    </div>
  );
}
