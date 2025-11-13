"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNotifications } from "../context/NotificationProvider";
import { NftPayload } from "../types/nftTypes";
import { api } from "../utils/api";
import { useSetParams } from "./useSetParams";

type UseBidOrBuyReturn = {
  isLoading: boolean;
  handleBid: () => Promise<void>;
  bidAmount: string | number;
  setBidAmount: React.Dispatch<React.SetStateAction<string | number>>;
  isAuction: boolean | "" | undefined;
  handleShare: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleLike: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isLiked: boolean | undefined;
  likesCount: number;
} | null;

export function useBidorBuy(nft: NftPayload): UseBidOrBuyReturn {
  const [isLiked, setIsLiked] = useState(nft.isLiked);
  const [likesCount, setLikesCount] = useState(nft.likes_count);
  const { isAuthenticated, user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const { navigate } = useSetParams();
  const { toast, addNotification } = useNotifications();
  // Check if NFT is on auction
  const [isAuction, setIsAuction] = useState(false);
  // State for bid amount
  const [bidAmount, setBidAmount] = useState<string | number>(nft.price);

  const router = useRouter();

  useEffect(() => {
    if (nft.auctionEndTime) {
      const auction = new Date(nft.auctionEndTime) > new Date();

      if (auction) {
        setIsAuction(auction);
        setBidAmount((nft.current_bid * 1.1).toFixed(2));
      }
    }
  }, [nft.auctionEndTime, nft.current_bid, nft._id]);

  // Handle bid submission
  const handleBid = async () => {
    if (bidAmount && Number(bidAmount) > 0) {
      if (!isAuthenticated) {
        navigate("/auth?login", {
          state: { from: `/marketplace/${nft._id}` },
        });
        return;
      }

      if (nft.owner._id === user?._id) {
        toast(
          "warning",
          "bid",
          "Error!",
          "You cannot Bid on your own listing",
          3000
        );
        return;
      }

      setIsLoading(true);
      const res = await api.post("/bids", {
        nft: nft._id,
        bidder: user?._id,
        amount: Number(bidAmount),
        time: new Date(),
      });

      if (!res.data.data) {
        toast("error", "bid", "Error!", "Something went wrong!", 7000);
        setIsLoading(false);
        return;
      }

      router.refresh();
      setIsLoading(false);

      addNotification({
        title: "Bid Placed",
        action: "bid",
        type: "success",
        message: `Bid of ${bidAmount} placed on ${nft.title}`,
        recipient: user?._id ?? "",
        isRead: false,
        isToast: false,
      });

      toast(
        "success",
        "bid",
        "Bid Placed!",
        `Bid of ${bidAmount} placed on ${nft.title}`,
        3000
      );
    }
  };

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
  const handleLike = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    // Toggle like status
    setIsLiked(!isLiked);
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);

    try {
      await api.post(`/likes`, { itemId: nft._id, itemType: "NFT" });
    } catch (err) {
      console.error("Failed to like nft:", err);
    }
  };
  return {
    isLoading,
    handleBid,
    bidAmount,
    handleShare,
    setBidAmount,
    isAuction,
    handleLike,
    isLiked,
    likesCount,
  };
}
