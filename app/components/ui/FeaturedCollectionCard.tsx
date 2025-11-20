import { CollectionPayload } from "@/app/types/collection";
import { formatEthPrice, formatNumber } from "@/app/utils/formatters";
import { CheckCircle } from "lucide-react";
import Image from "next/image";
import { memo } from "react";

export const FeaturedCollectionCard = memo(
  ({
    collection,
    className,
    handleClick,
  }: {
    collection: CollectionPayload;
    className: string;
    handleClick: () => void;
  }) => {
    const displayfloor_price = formatEthPrice(collection.floor_price);

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

            <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-row-reverse md:flex-row md:items-center">
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
                      <div className="relative h-8 w-8 overflow-hidden rounded-full mr-2">
                        <Image
                          sizes="30px"
                          src={collection.creator.avatar}
                          alt={collection.creator.name}
                          className="object-cover"
                          fill
                        />
                      </div>

                      <span>{collection.creator.name}</span>
                      {collection.creator.isVerified && (
                        <CheckCircle className="text-primary-500 ml-1 text-xs" />
                      )}
                    </div>
                  </div>
                )}

                {collection.description && (
                  <p className="text-light/70 text-xs md:text-sm mb-4 max-w-2xl line-clamp-2 md:line-clamp-1">
                    {collection.description}
                  </p>
                )}
              </div>

              <div className=" hidden md:flex  md:gap-8 gap-4">
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
              <div className="absolute top-1 left-1 md:top-4 md:left-4 bg-primary-500 text-light text-xs py-1 px-2 rounded-full">
                Featured
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
);

FeaturedCollectionCard.displayName = "FeaturedCollectionCard";
export default FeaturedCollectionCard;
