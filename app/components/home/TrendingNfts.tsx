"use client";

import NFTCard from "@/app/components/ui/NFTCard";
import { useSetParams } from "@/app/hooks/useSetParams";
import { getRandomItems } from "@/app/utils/formatters";
import Slider from "@/app/components/ui/Slider";
import { NftPayload } from "@/app/types/nftTypes";
import { useEffect, useState } from "react";

export default function TrendingNFTs({ nfts }: { nfts: NftPayload[] }) {
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

  const renderNFTCard = (nft: NftPayload) => (
    <NFTCard
      nft={nft}
      variant={type}
      onBid={handleBid}
      onBuy={handleBuy}
      className="h-full"
    />
  );

  const trendingnfts = getRandomItems(nfts, 20);

  return (
    <div className="py-16">
      <div className="container">
        <Slider
          title="Trending NFTs"
          subtitle="Explore trending and hot NFTs in the market"
          slidesToShow={4}
          items={trendingnfts as NftPayload[]}
          renderItem={renderNFTCard}
          autoplay={true}
        />
      </div>
    </div>
  );
}
