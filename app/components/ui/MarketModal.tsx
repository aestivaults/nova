import { NftPayload } from "@/app/types/nftTypes";
import {
  formatDate,
  formatEthPrice,
  formatRelativeTime,
} from "@/app/utils/formatters";
import { Heart, Share2 } from "lucide-react";
import Image from "next/image";
import Button from "./button";
import CountdownTimer from "./CountdownTimer";
import Modal from "./Modal";
import { useBidorBuy } from "@/app/hooks/useBidorBuy";

const MarketModal = ({ nft }: { nft: NftPayload }) => {
  const {
    isLoading,
    handleBuy,
    handleBid,
    bidAmount,
    setBidAmount,
    isAuction,
    handleLike,
    isLiked,
    handleShare,
  } = useBidorBuy(nft)!;

  return (
    <Modal.Window name="nft modal" size="xlarge" title={nft.title}>
      <div className="flex flex-col gap-6">
        <div className="rounded-lg overflow-hidden bg-darker">
          <div className="relative h-[300px] w-full">
            {nft.media_type === "video" ? (
              <video
                src={nft.media_url}
                loop
                autoPlay
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full">
                <Image
                  src={nft.media_url}
                  alt={nft.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>
        </div>

        {/* Details */}
        <div>
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold">{nft.title}</h2>
              <p className="text-light/60">Token ID: #{nft.token_id}</p>
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
                <div className="relative w-6 h-6  mr-2 ">
                  <Image
                    fill
                    src={nft?.creator?.avatar}
                    alt={nft.creator.name}
                    className="object-cover rounded-full"
                  />
                </div>

                <span>{nft.creator.name}</span>
              </div>
            </div>

            <div>
              <p className="text-light/60 text-sm">Owner</p>
              <div className="flex items-center mt-1">
                <Image
                  src={nft.owner.avatar}
                  height={30}
                  width={30}
                  alt={nft.owner.name}
                  className="rounded-full mr-2"
                />

                <span>{nft.owner.name}</span>
              </div>
            </div>
          </div>

          <div className="glass-card p-4 mb-6">
            {isAuction ? (
              <>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-light/60">Current Bid</p>
                  <p className="text-xl font-bold text-primary-400">
                    {formatEthPrice(nft?.current_bid)}
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-light/60">Auction Ends</p>
                  <CountdownTimer endTime={nft?.auctionEndTime || ""} />
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
              <div className="glass-card divide-y divide-light/10">
                {nft.bids.map((bid, index) => (
                  <div key={index} className="flex justify-between p-3">
                    <div className="flex items-center">
                      <span className="text-primary-400 mr-2">
                        {bid.bidder.name}
                      </span>
                      <span className="text-light/60 text-sm">
                        {formatRelativeTime(bid.time)}
                      </span>
                    </div>
                    <div className="font-medium">
                      {formatEthPrice(bid.amount)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Details</h3>
            <div className="glass-card p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-light/60 text-sm">Contract Address</p>
                  <p className="font-mono text-sm truncate">
                    {nft?.metadata?.contract}
                  </p>
                </div>
                <div>
                  <p className="text-light/60 text-sm">Token Standard</p>
                  <p>ERC-721</p>
                </div>
                <div>
                  <p className="text-light/60 text-sm">Blockchain</p>
                  <p>{nft.metadata.blockchain}</p>
                </div>
                <div>
                  <p className="text-light/60 text-sm">Created</p>
                  <p>{formatDate(nft.createdAt)}</p>
                </div>
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
                    onChange={(e) => setBidAmount(Number(e.target.value))}
                    min={nft.current_bid * 1.1}
                    step="0.01"
                  />
                </div>
                <Button
                  onClick={handleBid}
                  isLoading={isLoading}
                  variant="primary"
                  className="flex-1"
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
              isLoading={isLoading}
              disabled={isLoading}
              variant="primary"
              onClick={handleBuy}
              fullWidth
            >
              Buy Now for {formatEthPrice(nft.price)}
            </Button>
          )}
        </div>
      </div>
    </Modal.Window>
  );
};
export default MarketModal;
