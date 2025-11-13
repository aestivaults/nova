"use client";

import NFTCard from "@/app/components/ui/NFTCard";
import Slider from "@/app/components/ui/Slider";
import { useInView } from "@/app/hooks/inView";
import { useSetParams } from "@/app/hooks/useSetParams";
import { NftPayload } from "@/app/types/nftTypes";
import { useEffect, useState } from "react";

export default function TrendingNFTs({ nfts }: { nfts: NftPayload[] }) {
  const [type, setType] = useState<"default" | "compact">("compact");
  const { navigate } = useSetParams();
  const { ref, inView } = useInView<HTMLDivElement>();

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

  return (
    <div ref={ref} className="py-16">
      <div className="container">
        <Slider
          title="Trending NFTs"
          subtitle="Explore trending and hot NFTs in the market"
          slidesToShow={4}
          items={nfts as NftPayload[]}
          renderItem={renderNFTCard}
          autoplay={inView ? true : false}
        />
      </div>
    </div>
  );
}
