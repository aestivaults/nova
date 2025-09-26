"use client";
import Button from "@/app/components/ui/button";
import MarketModal from "@/app/components/ui/MarketModal";
import { UseModal } from "@/app/components/ui/Modal";
import NFTCard from "@/app/components/ui/NFTCard";
import { useSetParams } from "@/app/hooks/useSetParams";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { NftPayload } from "../types/nftTypes";

function MarketGrid({ nfts }: { nfts: NftPayload[] }) {
  const { setParams, searchParams } = useSetParams();
  const { open } = UseModal();
  const [selectedNFT, setSelectedNFT] = useState<NftPayload | null>(null);

  const filters = {
    type: searchParams.get("type") || "all",
    category: searchParams.get("category") || "all",
    sortBy: searchParams.get("sortBy") || "newest",
  };

  const currentCategory = searchParams.get("category") || "all";

  const handleBid = (nft: NftPayload) => {
    setSelectedNFT(nft);
    open("nft modal");
  };

  // Handle buy NFT
  const handleBuy = (nft: NftPayload) => {
    setSelectedNFT(nft);
    open("nft modal");
  };

  const filteredNFTs = useMemo(() => {
    return nfts
      .filter((nft) => {
        // Filter by type (buy now or auction)
        if (filters.type === "buynow" && nft.auctionEndTime) return false;
        if (filters.type === "auction" && !nft.auctionEndTime) return false;

        // Filter by category
        if (currentCategory !== "all" && nft.media_type !== currentCategory)
          return false;

        // Filter by price range

        return true;
      })
      .sort((a, b) => {
        // Sort by selected option
        switch (filters.sortBy) {
          case "oldest":
            return (
              Number(new Date(a.createdAt)) - Number(new Date(b.createdAt))
            );
          case "priceLowToHigh":
            return (
              (a.price || a.current_bid || 0) - (b.price || b.current_bid || 0)
            );
          case "priceHighToLow":
            return (
              (b.price || b.current_bid || 0) - (a.price || a.current_bid || 0)
            );

          case "newest":
          default:
            return (
              Number(new Date(b.createdAt)) - Number(new Date(a.createdAt))
            );
        }
      });
  }, [nfts, currentCategory, filters.sortBy, filters.type]);

  return (
    <>
      <p className="mb-6 text-light/60">
        Showing {filteredNFTs.length} results
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredNFTs.map((nft) => (
          <NFTCard
            key={nft._id}
            nft={nft}
            onBid={handleBid}
            onBuy={handleBuy}
          />
        ))}
      </div>

      {filteredNFTs.length === 0 && (
        <div className="text-center py-12">
          <div className="mb-4 text-4xl text-light/30">
            <Search />
          </div>
          <h3 className="text-xl font-medium mb-2">No NFTs Found</h3>
          <p className="text-light/60 mb-6">
            We couldn&apos;t find any NFTs matching your current filters.
          </p>
          <Button
            variant="primary"
            onClick={() =>
              setParams({
                type: "all",
                category: "all",
                sortBy: "newest",
              })
            }
          >
            Reset Filters
          </Button>
        </div>
      )}

      {selectedNFT && <MarketModal nft={selectedNFT} />}
    </>
  );
}
export default MarketGrid;
