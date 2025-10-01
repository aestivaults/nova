"use client";
import NFTCard from "@/app/components/ui/NFTCard";
import { useSetParams } from "@/app/hooks/useSetParams";
import { NftPayload } from "@/app/types/nftTypes";

import { useEffect, useState } from "react";
import Slider from "../ui/Slider";

export default function Auction({ nfts }: { nfts: NftPayload[] }) {
  const [type, setType] = useState<"default" | "compact">("compact");
  const { navigate } = useSetParams();

  const handleBid = (nft: NftPayload) => {
    navigate(`/marketplace/${nft._id}`);
  };

  // Handle buy NFT
  const handleBuy = (nft: NftPayload) => {
    navigate(`/marketplace/${nft._id}`);
  };

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 400) {
        setType("default");
      } else {
        setType("compact");
      }
    }

    handleResize(); // check on mount

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const liveAuctions = nfts.filter(
    (item) => new Date(item.auctionEndTime || 0) > new Date()
  );

  const renderNFTCard = (nft: NftPayload) => (
    <NFTCard
      variant={type}
      nft={nft}
      onBid={handleBid}
      onBuy={handleBuy}
      className="h-full"
    />
  );

  return (
    <section className="py-16 bg-gradient-to-b from-dark to-darker">
      <div className="container">
        <Slider
          title={"Live Auctions"}
          subtitle="Bid on these active auctions before they end"
          items={liveAuctions}
          renderItem={renderNFTCard}
          slidesToShow={4}
        />
      </div>
    </section>
  );
}
