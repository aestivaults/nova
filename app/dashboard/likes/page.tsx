"use client";
import { getUserLikes } from "@/app/lib/clientFunctions";
import { NftPayload } from "@/app/types/nftTypes";
import { useQuery } from "@tanstack/react-query";
import { Filter, Heart } from "lucide-react";
import Link from "next/link";
import Button from "../../components/ui/button";
import NFTCard from "../../components/ui/NFTCard";

export default function Page() {
  const { data: LikedNFTS, isLoading } = useQuery<NftPayload[], Error>({
    queryKey: ["user-likes"],
    queryFn: getUserLikes,
  });

  if (isLoading)
    return <div className="min-h-screen bg-black/50 animate-pulse"></div>;

  if (!LikedNFTS)
    return (
      <div className="text-center py-16 glass-card">
        <div className="mb-4">
          <Heart
            size={50}
            className="text-4xl max-w-lg mx-auto text-red-500 mb-4"
          />
        </div>
        <h3 className="text-xl font-medium mb-2">No Liked NFTs</h3>
        <p className="text-white/60 mb-6">
          You haven&apos;t liked any NFTs yet.
        </p>
        <Link href="/marketplace">
          <Button variant="primary">Explore Marketplace</Button>
        </Link>
      </div>
    );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Liked NFTs</h2>

        <div className="flex gap-3">
          <Button variant="secondary" size="small" icon={<Filter />}>
            Filter
          </Button>
        </div>
      </div>

      {LikedNFTS?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {LikedNFTS?.map((nft) => (
            <NFTCard key={nft._id} nft={nft} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 glass-card">
          <div className="mb-4">
            <Heart
              size={50}
              className="text-4xl max-w-lg mx-auto text-red-500 mb-4"
            />
          </div>
          <h3 className="text-xl font-medium mb-2">No Liked NFTs</h3>
          <p className="text-white/60 mb-6">
            You haven&apos;t liked any NFTs yet.
          </p>
          <Link href="/marketplace">
            <Button variant="primary">Explore Marketplace</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
