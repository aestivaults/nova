"use client";
import Button from "@/app/components/ui/button";
import MarketModal from "@/app/components/ui/MarketModal";
import { UseModal } from "@/app/components/ui/Modal";
import NFTCard from "@/app/components/ui/NFTCard";
import { NftPayload } from "@/app/types/nftTypes";
import { Search } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

import { useState } from "react";

export default function CollectionList({ data }: { data: NftPayload[] }) {
  const [selectedNFT, setSelectedNFT] = useState<NftPayload | null>(null);
  const { open } = UseModal();

  function handlebuy(collection: NftPayload) {
    setSelectedNFT(collection);
    open("nft modal");
  }
  return (
    <Suspense fallback={<div className="text-center">Loading...</div>}>
      <div>
        <p>Showing {data.length} items</p>
        {data.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {data.map((item) => (
              <NFTCard
                nft={item}
                key={item._id}
                onBuy={handlebuy}
                onBid={handlebuy}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 glass-card">
            <div className="text-5xl text-light/20 mb-4">
              <Search size={35} className="max-w-md mx-auto text-primary-500" />
            </div>
            <h3 className="text-xl font-medium mb-2">No NFTS Found</h3>
            <p className="text-light/60 mb-6">
              We couldn&apos;t find any NFTS belonging to this collection.
            </p>
            <div className="flex justify-center gap-4">
              <Link href={"/marketplace"}>
                <Button variant="primary">Market Place</Button>
              </Link>
              <Link href={"/collections"}>
                <Button variant="secondary">Collections</Button>
              </Link>
            </div>
          </div>
        )}
        {selectedNFT && <MarketModal nft={selectedNFT} />}
      </div>
    </Suspense>
  );
}
