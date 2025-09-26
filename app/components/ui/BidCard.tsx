import { Bid } from "@/app/types/bids";
import {
  formatDate,
  formatEthPrice,
  formatRelativeTime,
} from "../../utils/formatters";
import Button from "./button";

export function BidCard({
  bid,
  onAccept,
  onReject,
  showActions = true,
  variant = "default", // default, compact, history
  className = "",
}: {
  bid: Bid;
  onAccept?: (bid: Bid) => void;
  onReject?: (bid: Bid) => void;
  showActions?: boolean;
  variant?: string;
  className?: string;
}) {
  // Format bid amount
  const formattedAmount = formatEthPrice(bid.amount);

  // Format bid time
  const formattedTime =
    variant === "history"
      ? formatDate(bid.time || "datetime")
      : formatRelativeTime(bid.time);

  // Handle accept action
  const handleAccept = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (onAccept) {
      onAccept(bid);
    }
  };

  // Handle reject action
  const handleReject = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (onReject) {
      onReject(bid);
    }
  };

  // Compact variant
  if (variant === "compact") {
    return (
      <div className={`flex items-center justify-between py-2 ${className}`}>
        <div className="flex items-center">
          <div className="text-sm font-medium">{bid.bidder.name}</div>
          <div className="text-light/60 text-xs ml-2">{formattedTime}</div>
        </div>
        <div className="font-medium">{formattedAmount}</div>
      </div>
    );
  }

  // History variant
  if (variant === "history") {
    return (
      <div className={`flex justify-between p-3 hover:bg-light/5 ${className}`}>
        <div className="flex items-center">
          <span className="text-primary-400 mr-2">{bid.bidder.name}</span>
          <span className="text-light/60 text-sm">{formattedTime}</span>
        </div>
        <div className="font-medium">{formattedAmount}</div>
      </div>
    );
  }

  // Default variant
  return (
    <div className={`glass-card p-4 ${className}`}>
      <div className="flex items-start">
        {/* Bidder info */}
        <div className="flex-1">
          <div className="flex items-center mb-1">
            {bid.bidder.avatar && (
              <img
                src={bid.bidder.avatar}
                alt={bid.bidder.name}
                className="w-6 h-6 rounded-full mr-2"
              />
            )}
            <div className="font-medium">{bid.bidder.name}</div>
          </div>

          <div className="flex items-center text-sm text-light/60">
            <span>{formattedTime}</span>
            {bid.status && (
              <span
                className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                  bid.status === "accepted"
                    ? "bg-green-900/30 text-green-400"
                    : bid.status === "rejected"
                    ? "bg-red-900/30 text-red-400"
                    : "bg-yellow-900/30 text-yellow-400"
                }`}
              >
                {bid.status.charAt(0).toUpperCase() + bid.status.slice(1)}
              </span>
            )}
          </div>
        </div>

        {/* Bid amount */}
        <div className="text-right">
          <div className="text-lg font-bold text-primary-400 mb-1">
            {formattedAmount}
          </div>

          {bid.nft.title && (
            <div className="text-sm text-light/70">{bid.nft.title}</div>
          )}
        </div>
      </div>

      {/* Action buttons */}
      {showActions && bid.status === "active" && (
        <div className="flex justify-end gap-2 mt-4">
          <Button
            variant="outline"
            size="small"
            className="text-red-400 border-red-400/30 hover:bg-red-400/10"
            onClick={handleReject}
          >
            Reject
          </Button>

          <Button
            variant="outline"
            size="small"
            className="text-green-400 border-green-400/30 hover:bg-green-400/10"
            onClick={handleAccept}
          >
            Accept
          </Button>
        </div>
      )}
    </div>
  );
}

// Bids List Component
export function BidsList({
  bids,
  onAccept,
  onReject,
  showActions = true,
  emptyMessage = "No bids yet",
  variant = "default",
  className = "",
}: {
  bids: Bid[];
  onAccept?: (bid: Bid) => void;
  onReject?: (bid: Bid) => void;
  showActions?: boolean;
  emptyMessage?: string;
  variant: string;
  className?: string;
}) {
  if (!bids || bids.length === 0) {
    return (
      <div className={`text-center py-6 text-light/60 ${className}`}>
        {emptyMessage}
      </div>
    );
  }

  if (variant === "history") {
    return (
      <div className={`glass-card divide-y divide-light/10 ${className}`}>
        {bids.map((bid, index) => (
          <BidCard key={bid._id || index} bid={bid} variant="history" />
        ))}
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div className={`space-y-1 ${className}`}>
        {bids.map((bid, index) => (
          <BidCard key={bid._id || index} bid={bid} variant="compact" />
        ))}
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {bids.map((bid, index) => (
        <BidCard
          key={bid._id || index}
          bid={bid}
          onAccept={onAccept}
          onReject={onReject}
          showActions={showActions}
        />
      ))}
    </div>
  );
}
