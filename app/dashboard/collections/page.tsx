"use client";
import { FolderOpen, Plus } from "lucide-react";
import Image from "next/image";
import Button from "../../components/ui/button";
import { useSetParams } from "../../hooks/useSetParams";
import { formatEthPrice } from "../../utils/formatters";
import { useQuery } from "@tanstack/react-query";
import { getUserCollections } from "@/app/lib/clientFunctions";
import { CollectionPayload } from "@/app/types/collection";
import { NFTGridSkeleton } from "@/app/components/ui/Loader";

export default function Page() {
  const { navigate } = useSetParams();
  const { data: collections, isLoading } = useQuery<CollectionPayload[], Error>(
    {
      queryFn: getUserCollections,
      queryKey: ["user-collections"],
    }
  );

  if (isLoading || !collections) return <NFTGridSkeleton />;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">My Collections</h2>

        <Button
          variant="primary"
          size="small"
          icon={<Plus />}
          onClick={() => navigate("/create-collection")}
        >
          Create Collection
        </Button>
      </div>

      {collections.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map((collection) => (
            <div
              key={collection._id}
              className="glass-card overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-300"
              onClick={() => navigate(`/collections/${collection._id}`)}
            >
              <div className="h-40 w-full relative overflow-hidden">
                <Image
                  fill
                  sizes="160px"
                  src={collection.banner_image}
                  alt={collection.name}
                  className="w object-cover"
                />
              </div>

              <div className="px-4 -mt-10 mb-4 relative">
                <div className="w-20 relative h-20 rounded-xl overflow-hidden border-4 border-darker">
                  <Image
                    fill
                    sizes="80px"
                    src={collection.logo_image}
                    alt={collection.name}
                    className="-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-bold text-lg mb-4">{collection.name}</h3>

                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="text-center bg-white/5 rounded-lg p-2">
                    <p className="text-xs text-white/60">Items</p>
                    <p className="font-medium">{collection.nfts.length}</p>
                  </div>
                  <div className="text-center bg-white/5 rounded-lg p-2">
                    <p className="text-xs text-white/60">Floor</p>
                    <p className="font-medium">
                      {formatEthPrice(collection.floor_price)}
                    </p>
                  </div>
                  <div className="text-center bg-white/5 rounded-lg p-2">
                    <p className="text-xs text-white/60">Volume</p>
                    <p className="font-medium">
                      {formatEthPrice(collection.total_volume)}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <Button variant="primary" size="small">
                    View
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 glass-card">
          <div className="mb-4">
            <FolderOpen
              size={50}
              className="max-w-md mx-auto text-5xl text-white/20"
            />
          </div>
          <h3 className="text-xl font-medium mb-2">No Collections Found</h3>
          <p className="text-white/60 mb-6">
            You haven&apos;t created any collections yet.
          </p>
          <Button
            variant="primary"
            onClick={() => navigate("/create-collection")}
          >
            Create Your First Collection
          </Button>
        </div>
      )}
    </div>
  );
}
