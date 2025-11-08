"use client";

import { getUserBids } from "@/app/lib/serverFunctions";
import { Bid } from "@/app/types/bids";
import { useQuery } from "@tanstack/react-query";
import { Gavel } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";
import BidWithNFT from "../admin/bids/BidwithNft";
import Button from "../components/ui/button";

export default function BidsList({
  initialBids,
  activeTab,
}: {
  initialBids: Bid[];
  activeTab: string;
}) {
  const { data: allBids = [] } = useQuery<Bid[], Error>({
    queryKey: ["user-bids"], // all bids
    queryFn: getUserBids,
    initialData: initialBids,
  });

  // Filter on client, re-run when activeTab or data changes
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
          ["won", "lost", "accepted", "rejected"].includes(
            bid.status.toLowerCase()
          )
        );
      default:
        return allBids;
    }
  }, [allBids, activeTab]);

  // Rest of UI...
  return (
    <div className="pb-10">
      {filteredBids.length > 0 ? (
        <div className="grid grid-cols-1 gap-6">
          {filteredBids.map((bid) => (
            <BidWithNFT type={"user"} key={bid._id} bid={bid} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 glass-card">
          <div className="mb-4">
            <Gavel
              className="max-w-md mx-auto text-5xl text-white/20"
              size={35}
            />
          </div>
          <h3 className="text-xl font-medium mb-2">No Bids Found</h3>
          <p className="text-white/60 mb-6">
            {activeTab === "active"
              ? "You don't have any active bids at the moment."
              : activeTab === "outbid"
                ? "You haven't been outbid on any auctions."
                : "You don't have any bid history yet."}
          </p>

          <Link href={"/marketplace"}>
            <Button>Browse Auctions</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
