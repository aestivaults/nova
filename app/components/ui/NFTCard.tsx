"use client";
import { useAuth } from "@/app/context/AuthContext";
import { NftPayload } from "@/app/types/nftTypes";
import { Eye, Gavel, Heart, Share2, ShoppingCart, Tag } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  formatEthPrice,
  formatNumber,
  formatTimeRemaining,
  truncateAddress,
} from "../../utils/formatters";
import Button from "./button";
import { useNotifications } from "@/app/context/NotificationProvider";
import { useSetParams } from "@/app/hooks/useSetParams";
import { api } from "@/app/utils/api";

interface cardprops {
  nft: NftPayload;
  variant?: "default" | "auction" | "collection" | "compact";
  onBuy?: (nft: NftPayload) => void;
  onBid?: (nft: NftPayload) => void;
  className?: string;
}

export default function NFTCard({
  nft,
  variant = "default",
  onBuy,
  onBid,
  className = "",
}: cardprops) {
  const [isLiked, setIsLiked] = useState(nft.isLiked);
  const [likesCount, setLikesCount] = useState(nft.likes_count);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { user } = useAuth();
  const { toast } = useNotifications();
  const { navigate } = useSetParams();

  useEffect(() => {
    const video = videoRef.current;
    if (!video || nft.media_type !== "video") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch((err) => console.log("Autoplay prevented:", err));
        } else {
          video.pause();
          video.currentTime = 0;
        }
      },
      {
        threshold: 0.5, // Play only when 50% is visible
      }
    );

    observer.observe(video);

    return () => observer.unobserve(video);
  }, [nft.media_type]);

  // Handle like action
  const handleLike = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    // Toggle like status
    setIsLiked(!isLiked);
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);

    try {
      await api.post(`/likes`, { itemId: nft._id, itemType: "NFT" });
    } catch (err) {
      console.error("Failed to add like:", err);
    }
  };

  const handleBid = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (onBid) onBid(nft);
  };

  const handleBuy = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (onBuy) onBuy(nft);
  };

  const isAuction =
    nft.auctionEndTime && new Date(nft.auctionEndTime) > new Date();

  const handleShare = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    const shareUrl = `${window.location.origin}/marketplace/${nft._id}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: nft.title,
          text: `Check out this NFT: ${nft.title}`,
          url: shareUrl,
        });
      } catch (error) {
        console.log(error);
        console.error("Error sharing:", error);
      }
    } else {
      // Fallback: Copy to clipboard
      try {
        await navigator.clipboard.writeText(shareUrl);
        toast(
          "info",
          "like",
          "Link Copied!",
          "Link copied to clipboard!",
          3500
        );
      } catch (err) {
        console.log(err);
        toast(
          "error",
          "like",
          "Error!",
          "Failed to copy link. Please share manually.",
          3500
        );
      }
    }
  };

  return (
    <div
      className={`nft-card glass-card ${className}`}
      onClick={() => navigate(`/marketplace/${nft._id}`)}
    >
      <div className="media-container relative">
        {nft.media_type === "video" ? (
          <video
            ref={videoRef}
            src={nft.media_url}
            loop
            autoPlay
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          <Image
            src={nft.media_url}
            alt={nft.title}
            unoptimized
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        )}
        {/* Badge for auction or instant buy */}
        {variant !== "compact" && (
          <div className="absolute top-3 left-3">
            {isAuction ? (
              <span className="badge p-1 badge-secondary text-xs">
                <Gavel className="mr-1" /> Live Auctions
              </span>
            ) : (
              <span className="badge p-1 badge-primary text-xs">
                <Tag className="mr-1" /> Buy Now
              </span>
            )}
          </div>
        )}
        {/* Actions overlay */}
        <div className="actions">
          <button
            className="btn-icon"
            onClick={handleLike}
            aria-label="Like NFT"
          >
            <Heart
              className={`w-5 h-5 transition-colors ${
                isLiked ? "fill-red-500 text-red-500" : "fill-none text-white"
              }`}
            />
          </button>

          {user && (
            <button
              className="btn-icon"
              onClick={handleShare}
              aria-label="Share NFT"
            >
              <Share2 />
            </button>
          )}
        </div>
        {/* Time left for auctions */}
        {isAuction && variant !== "compact" && (
          <div className="absolute bottom-3 left-3 right-3 bg-dark/70 backdrop-blur-sm rounded-lg p-1 md:p-2 text-xs font-medium">
            <div className="flex justify-between items-center">
              <span>Time Left:</span>
              <span className="text-primary-300">
                {formatTimeRemaining(nft.auctionEndTime ?? "")}
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="metadata md:p-4 p-2">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-base font-bold truncate">{nft.title}</h3>

          {variant !== "compact" && (
            <span className="text-xs  hidden sm:block bg-primary-900/50 rounded-full px-2 py-0.5">
              #{truncateAddress(nft.token_id)}
            </span>
          )}
        </div>

        {variant !== "compact" && (
          <div className="mb-1 md:mb-3">
            <div className="creator flex items-center md:space-x-2">
              <div className="relative w-5 h-5">
                <Image
                  fill
                  sizes="100px"
                  src={nft.creator.avatar || "/pfp.png"}
                  alt={nft.creator.name}
                  className="object-cover rounded-full"
                />
              </div>

              <span className="text-xs text-light/70">
                <span className="text-light">{nft.owner.name}</span>
              </span>
            </div>
          </div>
        )}

        {/* Price and buttons */}
        <div className="mt-auto">
          <div className="flex justify-between items-center mb-3">
            <div>
              <p className="text-xs text-light/70 mb-0.5">
                {isAuction ? "current bid" : "price"}
              </p>
              <p className="price text-base">
                {formatEthPrice(isAuction ? nft.current_bid : nft.price)}
              </p>
            </div>

            {variant !== "compact" && (
              <div className="text-right hidden sm:block">
                <p className="text-xs text-light/70 mb-0.5">{"likes"}</p>
                <p className="text-sm font-medium">
                  {formatNumber(likesCount)}
                </p>
              </div>
            )}
          </div>

          {variant !== "compact" && (
            <div className="flex md:flex-row flex-col gap-2 space-x-2">
              {isAuction ? (
                <Button
                  variant="primary"
                  size="small"
                  fullWidth
                  onClick={handleBid}
                  icon={<Gavel />}
                >
                  place Bid
                </Button>
              ) : (
                <Button
                  variant="primary"
                  size="small"
                  fullWidth
                  onClick={handleBuy}
                >
                  <ShoppingCart className="mr-1" /> Buy now
                </Button>
              )}

              <div className="w-full hidden sm:block ">
                <Button variant="secondary" fullWidth size="small">
                  <Eye />
                </Button>
              </div>
            </div>
          )}

          {variant === "compact" && (
            <Button variant="secondary" fullWidth size="small">
              View <Eye />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
