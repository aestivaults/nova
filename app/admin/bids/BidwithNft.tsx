"use client";
import Button from "@/app/components/ui/button";
import CountdownTimer from "@/app/components/ui/CountdownTimer";
import Modal from "@/app/components/ui/Modal";
import { useAuth } from "@/app/context/AuthContext";
import { useNotifications } from "@/app/context/NotificationProvider";
import { useSetParams } from "@/app/hooks/useSetParams";
import { UpdateBidStatus } from "@/app/lib/clientFunctions";
import PurchaseBid from "@/app/my-bids/PurchaseBid";
import { Bid } from "@/app/types/bids";
import { formatEthPrice, formatRelativeTime } from "@/app/utils/formatters";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";

const BidWithNFT = ({
  bid,
  type,
}: {
  bid: Bid;
  type: "user" | "owner" | "admin";
}) => {
  const { navigate } = useSetParams();
  const { user } = useAuth();
  const { toast } = useNotifications();
  const queryClient = useQueryClient();

  const { mutate, isPending: isAccepting } = useMutation({
    mutationFn: () => UpdateBidStatus("accept", bid),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["received-bids"] });
      queryClient.invalidateQueries({
        queryKey: ["notifications"],
        exact: false,
      });
    },

    onError: () =>
      toast("error", "bid", "Error!", "Failed to update Bid", 5000),
  });

  const { mutate: mutateReject, isPending: isRejecting } = useMutation({
    mutationFn: () => UpdateBidStatus("reject", bid),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["received-bids"] });
      queryClient.invalidateQueries({
        queryKey: ["notifications"],
        exact: false,
      });
    },
    onError: () =>
      toast("error", "bid", "Error!", "Failed to update Bid", 5000),
  });

  const handleAcceptBid = () => mutate();
  const handleRejectBid = () => mutateReject();
  // Handle bid removal (for admin)
  const handleRemoveBid = (bid: Bid) => {
    console.log("Removed bid:", bid);
  };
  console.log(bid);
  return (
    <>
      <div className="glass-card p-4 flex">
        {/* NFT Image */}
        <div className="w-20 relative h-20 rounded-lg overflow-hidden mr-4 flex-shrink-0">
          <Image
            fill
            src={bid.nft.media_url}
            alt={bid.nft.title}
            className="w-full h-full object-cover"
          />
        </div>
        {/* Bid Details */}
        <div className="flex-1">
          <div className="flex justify-between items-start mb-1">
            <h4 className="tex-xs md:text-base font-medium">{bid.nft.title}</h4>
            <div className="text-sm md:text-lg font-bold text-primary-400">
              {formatEthPrice(bid.amount)}
            </div>
          </div>
          <div className="flex items-center mb-2">
            <span className="text-sm text-white/60 mr-3">
              {/* Bid by: {bid.bidder} */}
            </span>
            <span className="text-xs md:text-sm text-white/60">
              {formatRelativeTime(bid.time)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              {bid.status && (
                <span
                  className={`px-2 py-0.5 rounded-full text-xs mr-3 ${
                    bid.status === "active" || bid.status === "pending"
                      ? "bg-yellow-900/30 text-yellow-400"
                      : bid.status === "won" || bid.status === "accepted"
                        ? "bg-green-900/30 text-green-400"
                        : bid.status === "outbid" ||
                            bid.status === "lost" ||
                            bid.status === "rejected"
                          ? "bg-red-900/30 text-red-400"
                          : "bg-gray-900/30 text-gray-400"
                  }`}
                >
                  {bid.status.charAt(0).toUpperCase() + bid.status.slice(1)}
                </span>
              )}
              {bid.nft.auctionEndTime &&
                new Date(bid.nft.auctionEndTime) > new Date() && (
                  <div className="hidden sm:block text-xs md:text-sm">
                    <span className="text-white/60">Ends: </span>
                    <CountdownTimer
                      endTime={bid.nft.auctionEndTime}
                      size="small"
                      showLabels={true}
                    />
                  </div>
                )}
            </div>
            <div className="flex gap-2">
              {/* Owner actions */}
              {type === "owner" && bid.status === "active" && (
                <>
                  <Button
                    variant="outline"
                    size="small"
                    isLoading={isRejecting}
                    disabled={isAccepting || isRejecting}
                    className="text-red-400 border-red-400/30 hover:bg-red-400/10"
                    onClick={handleRejectBid}
                  >
                    Reject
                  </Button>
                  <Button
                    variant="outline"
                    size="small"
                    isLoading={isAccepting}
                    disabled={isAccepting || isRejecting}
                    className="text-green-400 border-green-400/30 hover:bg-green-400/10"
                    onClick={handleAcceptBid}
                  >
                    Accept
                  </Button>
                </>
              )}
              {/* Admin actions */}
              {type === "admin" && (
                <Button
                  variant="outline"
                  size="small"
                  className="text-red-400 border-red-400/30 hover:bg-red-400/10"
                  onClick={() => handleRemoveBid(bid)}
                >
                  Remove
                </Button>
              )}
              {type == "user" &&
                bid.status === "accepted" &&
                bid.nft.owner._id !== user?._id && (
                  <Modal.Open name="purchase-modal">
                    <Button
                      variant="primary"
                      className="text-green-400 border-green-400/30 hover:bg-green-400/10"
                    >
                      Purchase
                    </Button>
                  </Modal.Open>
                )}
              {/* User actions - View auction */}
              {type === "user" && (
                <Button
                  variant="outline"
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/marketplace/${bid.nft._id}`);
                  }}
                >
                  View
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      <PurchaseBid nft={bid.nft} onClose={() => {}} />
    </>
  );
};

export default BidWithNFT;
