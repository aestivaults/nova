"use client";
import { BidsList } from "@/app/components/ui/BidCard";
import Button from "@/app/components/ui/button";
import CountdownTimer from "@/app/components/ui/CountdownTimer";
import { useBidorBuy } from "@/app/hooks/useBidorBuy";
import { NftPayload } from "@/app/types/nftTypes";
import {
  formatDate,
  formatEthPrice,
  truncateAddress,
} from "@/app/utils/formatters";
import { Heart, Share2 } from "lucide-react";
import Image from "next/image";

export default function NFTDetail({ nft }: { nft: NftPayload }) {
  const {
    isLoading,
    handleBuy,
    handleBid,
    bidAmount,
    setBidAmount,
    isAuction,
    handleShare,
    handleLike,
    isLiked,
  } = useBidorBuy(nft)!;

  return (
    <div className="glass-card p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Media */}
        <div className="rounded-lg min-h-[400px] relative overflow-hidden">
          {nft.media_type === "video" ? (
            <video
              src={nft.media_url}
              controls
              autoPlay
              className="w-full h-full"
            />
          ) : (
            <Image
              fill
              src={nft.media_url}
              alt={nft.title}
              className="w-full h-max-screen object-cover"
            />
          )}
        </div>

        {/* Details */}
        <div>
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold">{nft.title}</h2>
              <p className="text-light/60">
                Token ID: #{truncateAddress(nft.token_id)}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                className="btn-icon"
                onClick={handleLike}
                aria-label="Like NFT"
              >
                <Heart
                  className={`w-5 h-5 transition-colors ${
                    isLiked
                      ? "fill-red-500 text-red-500"
                      : "fill-none text-white"
                  }`}
                />
              </button>
              <Button onClick={handleShare} variant="text" className="btn-icon">
                <Share2 />
              </Button>
            </div>
          </div>

          <div className="flex gap-4 mb-6">
            <div>
              <p className="text-light/60 text-sm">Creator</p>
              <div className="flex items-center mt-1">
                <div className="relative aspect-square mr-2 h-full w-full">
                  <Image
                    fill
                    src={nft.creator.avatar || "/pfp.png"}
                    alt={nft.creator.name}
                    className="rounded-full object-cover"
                  />
                </div>

                <span className="text-xs md:text-sm">{nft.creator.name}</span>
              </div>
            </div>

            {nft.owner && (
              <div>
                <p className="text-light/60 text-sm">Owner</p>
                <div className="flex items-center mt-1">
                  <div className="relative aspect-square mr-2 h-full w-full">
                    <Image
                      fill
                      src={nft.owner.avatar}
                      alt={nft.owner.name}
                      className="rounded-full"
                    />
                  </div>

                  <span className="text-xs md:text-sm">{nft.owner.name}</span>
                </div>
              </div>
            )}
          </div>

          <div className="glass-card p-4 mb-6">
            {isAuction ? (
              <>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-light/60">Current Bid</p>
                  <p className="text-xl font-bold text-primary-400">
                    {formatEthPrice(nft.current_bid)}
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-light/60">Auction Ends</p>
                  <CountdownTimer endTime={nft.auctionEndTime ?? ""} />
                </div>
              </>
            ) : (
              <div className="flex justify-between items-center">
                <p className="text-light/60">Price</p>
                <p className="text-xl font-bold text-primary-400">
                  {formatEthPrice(nft.price)}
                </p>
              </div>
            )}
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Description</h3>
            <p className="text-light/70">{nft.description}</p>
          </div>

          {isAuction && nft.bids && nft.bids.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Bid History</h3>
              <BidsList bids={nft.bids} variant="history" showActions={false} />
            </div>
          )}

          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Details</h3>
            <div className="glass-card p-4">
              <div className="grid grid-cols-2 gap-4">
                {nft.metadata &&
                  Object.entries(nft.metadata).map(([key, value]) => (
                    <div key={key}>
                      <p className="text-light/60 text-sm capitalize">{key}</p>
                      <p className="font-mono text-sm truncate">{value}</p>
                    </div>
                  ))}

                {nft.createdAt && (
                  <div>
                    <p className="text-light/60 text-sm">Created</p>
                    <p>{formatDate(nft.createdAt)}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {isAuction ? (
            <div className="flex flex-col gap-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <input
                    type="number"
                    className="form-input"
                    placeholder="Enter bid amount"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    min={nft.current_bid * 1.1}
                    step="0.01"
                  />
                </div>
                <Button
                  variant="primary"
                  className="flex-1"
                  isLoading={isLoading}
                  onClick={handleBid}
                  disabled={
                    !bidAmount ||
                    Number(bidAmount) <= nft.current_bid ||
                    isLoading
                  }
                >
                  Place Bid
                </Button>
              </div>
              <p className="text-xs text-light/60 text-center">
                You must bid at least 10% more than the current bid
              </p>
            </div>
          ) : (
            <Button
              variant="primary"
              isLoading={isLoading}
              disabled={isLoading}
              fullWidth
              onClick={handleBuy}
            >
              Buy Now for {formatEthPrice(nft.price)}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
