import { Gavel } from "lucide-react";
import Image from "next/image";
import Button from "../components/ui/button";
import CountdownTimer from "../components/ui/CountdownTimer";
import { Bid } from "../types/bids";
import { formatEthPrice, formatRelativeTime } from "../utils/formatters";
import Link from "next/link";

export default function MyBids({ activeBids }: { activeBids: Bid[] }) {
  const BidWithNFT = ({ bid }: { bid: Bid }) => (
    <div className="glass-card p-4 flex">
      <div className="w-20 relative h-20 rounded-lg overflow-hidden mr-4 flex-shrink-0">
        <Image
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          src={bid.nft?.media_url ?? ""}
          alt={bid.nft.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Bid Details */}
      <div className="flex-1">
        <div className="flex justify-between items-start mb-1">
          <h4 className="font-medium">{bid.nft.title}</h4>
          <div className="text-lg font-bold text-primary-400">
            {formatEthPrice(bid.amount)}
          </div>
        </div>

        <div className="flex justify-between items-center mb-3">
          <div className="text-sm text-white/60">
            Bid placed {formatRelativeTime(bid.time)}
          </div>
          <div>
            {bid.status === "active" && (
              <span className="px-2 py-0.5 rounded-full text-xs bg-green-900/30 text-green-400">
                Active
              </span>
            )}
            {bid.status === "outbid" && (
              <span className="px-2 py-0.5 rounded-full text-xs bg-red-900/30 text-red-400">
                Outbid
              </span>
            )}
            {bid.status === "won" && (
              <span className="px-2 py-0.5 rounded-full text-xs bg-purple-900/30 text-purple-400">
                Won
              </span>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="text-sm">
            <span className="text-white/60">Ends: </span>
            <CountdownTimer
              endTime={bid.nft.auctionEndTime ?? ""}
              size="small"
            />
          </div>

          <Button variant="outline" size="small">
            View Auction
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">My Bids</h2>

        <div className="flex gap-3">
          <Button variant="secondary" size="small" onClick={() => {}}>
            Active Bids
          </Button>

          <Button variant="secondary" size="small" onClick={() => {}}>
            Outbid
          </Button>

          <Button variant="secondary" size="small" onClick={() => {}}>
            Historical
          </Button>
        </div>
      </div>

      {activeBids.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {activeBids.map((bid) => (
            <BidWithNFT key={bid._id} bid={bid} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 glass-card">
          <div className="mb-4">
            <Gavel size={50} className="text-4xl mx-auto text-blue-500 mb-4" />
          </div>
          <h3 className="text-xl font-medium mb-2">No Active Bids</h3>
          <p className="text-white/60 mb-6">
            You don&apos;t have any active bids at the moment.
          </p>
          <Link href="/marketplace">
            <Button variant="primary">Browse Auctions</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
