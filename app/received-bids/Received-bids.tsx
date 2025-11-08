"use client";
import { useQuery } from "@tanstack/react-query";
import BidWithNFT from "../admin/bids/BidwithNft";
import { Bid } from "../types/bids";
import { getReceivedBid } from "../lib/serverFunctions";
import { useMemo } from "react";

export default function ReceivedBids({
  initialData,
  activeTab,
}: {
  activeTab: string;
  initialData: Bid[];
}) {
  const { data: allBids } = useQuery<Bid[], Error>({
    queryKey: ["received-bids"],
    queryFn: getReceivedBid,
    initialData: initialData,
  });

  const filteredBids = useMemo(() => {
    switch (activeTab) {
      case "active":
        return allBids.filter((bid) =>
          ["active", "pending"].includes(bid.status)
        );
      case "won":
        return allBids.filter((bid) => bid.status === "accepted");
      case "outbid":
        return allBids.filter((bid) => bid.status === "outbid");
      case "history":
        return allBids.filter((bid) =>
          ["won", "lost", "accepted", "rejected"].includes(bid.status)
        );
      default:
        return allBids;
    }
  }, [allBids, activeTab]);

  return (
    <div className="pb-10">
      {filteredBids.length > 0 ? (
        <div className="grid grid-cols-1 gap-6">
          {filteredBids.map((bid) => (
            <BidWithNFT type={"owner"} key={bid._id} bid={bid} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 glass-card">
          <div className="mb-4">
            <i className="fas fa-gavel text-5xl text-white/20"></i>
          </div>
          <h3 className="text-xl font-medium mb-2">No Bids Found</h3>
          <p className="text-white/60 mb-6">
            {activeTab === "active"
              ? "You don't have any active bids at the moment."
              : activeTab === "outbid"
                ? "You haven't been outbid on any auctions."
                : "You don't have any bid history yet."}
          </p>
        </div>
      )}
    </div>
  );
}
