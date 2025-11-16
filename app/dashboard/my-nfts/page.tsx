"use client";
import Button from "@/app/components/ui/button";
import NFTCard from "@/app/components/ui/NFTCard";
import { useDashboardProvider } from "@/app/context/DashboardProvider";
import { Images } from "lucide-react";
import Link from "next/link";

export default function Page() {
  const { Nfts } = useDashboardProvider();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">My NFTs</h2>

        <div className="flex gap-3">
          <Link href="/marketplace">
            <Button variant="primary">Browse Marketplace</Button>
          </Link>
        </div>
      </div>

      {Nfts && Nfts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-6">
          {Nfts.map((nft) => (
            <NFTCard key={nft._id} nft={nft} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 glass-card">
          <div className="mb-4">
            <Images
              size={50}
              className="text-4xl max-w-lg mx-auto text-red-500 mb-4"
            />
          </div>
          <h3 className="text-xl font-medium mb-2">No NFTs Found</h3>
          <p className="text-white/60 mb-6">You don&apos;t own any NFTs yet.</p>
          <Link href={"/marketplace"}>
            <Button variant="primary">Browse Marketplace</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
