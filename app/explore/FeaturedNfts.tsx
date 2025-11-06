"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import MarketModal from "@/app/components/ui/MarketModal";
import { UseModal } from "../components/ui/Modal";
import NFTCard from "../components/ui/NFTCard";
import Button from "../components/ui/button";
import { useSetParams } from "../hooks/useSetParams";
import { NftPayload } from "../types/nftTypes";
import Pagination from "../components/ui/Pagination";
import { pagination } from "../lib/getnfts";

export default function FeaturedNFTs({
  nfts,
  pagination,
}: {
  nfts: NftPayload[];
  pagination: pagination | null;
}) {
  const { searchParams } = useSetParams();
  const [selectedNFT, setSelectedNFT] = useState<NftPayload | null>(null);
  const { open } = UseModal();

  const currentCategory = searchParams.get("category") || "all";
  const filteredNfts =
    currentCategory !== "all"
      ? nfts.filter((item) => item.type === currentCategory)
      : nfts;

  function handleBuy(nft: NftPayload) {
    setSelectedNFT(nft);
    open("nft modal");
  }

  return (
    <section className="py-8">
      <div className="container">
        <h2 className="text-2xl font-bold mb-6">Featured NFTs</h2>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-6">
          {filteredNfts.slice(0, 16).map((nft) => (
            <NFTCard
              key={nft._id}
              nft={nft}
              onBuy={handleBuy}
              onBid={handleBuy}
              className="h-full"
            />
          ))}
        </div>
        {pagination && <Pagination pagination={pagination} />}

        <div className="text-center mt-10">
          <Link href="marketplace">
            <Button
              variant="outline"
              size="medium"
              icon={<ArrowRight />}
              iconPosition="right"
            >
              View All NFTs
            </Button>
          </Link>
        </div>
      </div>
      {selectedNFT && <MarketModal nft={selectedNFT} />}
    </section>
  );
}
