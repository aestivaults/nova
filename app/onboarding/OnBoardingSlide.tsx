"use client";
import Image from "next/image";
import Slider from "../components/ui/Slider";
import { NftPayload } from "../types/nftTypes";

export default function OnBoardingSlide({
  nfts,
  error,
}: {
  error: string | null;
  nfts: NftPayload[];
}) {
  const renderNftSlide = (nft: NftPayload) => (
    <div className="relative group min-h-screen rounded-xl shadow-xl">
      {/* Background Image */}

      <Image
        src={nft.media_url}
        alt={nft.title}
        fill
        priority
        className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-in-out"
        sizes="(max-width: 768px) 100vw, 50vw"
      />

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/50 to-black z-10" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 z-20 p-6 md:p-8">
        {/* Top Row: Tags */}
        <div className="flex items-center justify-between mb-4">
          <span className="px-3 py-1 text-xs font-medium bg-white/10 text-white rounded-full backdrop-blur-sm border border-white/10">
            {nft.metadata.blockchain}
          </span>
          <span className="px-3 py-1 text-xs font-medium rounded-full text-primary-300 bg-primary/10 border border-primary/30 backdrop-blur-sm">
            {nft.type === "auction" ? "🔥 Auction" : "💎 Sale"}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-2xl font-extrabold text-white mb-2 line-clamp-2 drop-shadow-lg">
          {nft.title}
        </h3>

        {/* Price & Creator */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl md:text-3xl font-bold text-primary drop-shadow">
              {nft.type === "auction"
                ? `ETH ${nft.current_bid?.toLocaleString()}`
                : `ETH ${nft.price?.toLocaleString()}`}
            </span>
            {nft.type === "auction" && (
              <span className="text-sm text-white/70">
                {nft.bids?.length || 0} bids
              </span>
            )}
          </div>

          {/* Creator */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-white/60">by</span>
            <span className="text-sm font-semibold text-white hover:underline cursor-pointer">
              {nft.creator?.username || "Creator"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="hidden relative md:block h-full">
      {error ? (
        <div className="flex items-center justify-center ">
          <div className="text-center text-white">
            <div className="text-6xl mb-4">🔥</div>
            <h3 className="text-2xl font-bold mb-2">Hot Drops Loading...</h3>
            <p className="text-gray-300">Featured collections coming soon</p>
          </div>
        </div>
      ) : nfts.length > 0 ? (
        <Slider
          items={nfts}
          renderItem={renderNftSlide}
          autoplay={true}
          autoplaySpeed={4000}
          slidesToShow={1}
          showArrows={false}
          showDots={false}
          infiniteLoop={true}
        />
      ) : (
        <div className="h-full flex items-center justify-center">
          <div className="text-center text-white">
            <div className="text-8xl mb-4 animate-bounce">🎨</div>
            <h3 className="text-3xl font-bold mb-2">Collection Coming Soon</h3>
            <p className="text-gray-300">
              Be the first to explore our marketplace
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
