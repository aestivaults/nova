import { Bid } from "@/app/types/bids";
import { createServerApi } from "@/app/utils/api";
import { cookies } from "next/headers";
import Tabs from "./BidTabs";
import BidWithNFT from "./BidwithNft";
import { Gavel } from "lucide-react";
export default async function Bidding({
  searchParams,
}: {
  searchParams: Promise<{ current: string }>;
}) {
  const params = await searchParams;
  const activeTab = params.current || "active";
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;
  const serverapi = createServerApi(token, refreshToken);

  let bids: Bid[] = [];

  const res = await serverapi.get("/admin/bids");
  if (res.data.data) bids = res.data.data;

  const getFilteredBids = () => {
    switch (activeTab) {
      case "active":
        return bids.filter((bid) => ["active", "pending"].includes(bid.status));
      case "history":
        return bids.filter((bid) =>
          ["won", "lost", "accepted", "rejected"].includes(bid.status)
        );
      case "outbid":
        return bids.filter((bid) => bid.status === "outbid");
      case "suspicious":
        // For admin: potentially suspicious bids (example criteria)
        return bids.filter(
          (bid) =>
            bid.amount > 10 || // Unusually high bids
            new Date(bid.time) > new Date(Date.now() - 3600000) // Very recent bids
        );
      default:
        return bids;
    }
  };

  const filteredBids = getFilteredBids();

  return (
    <div className="py-25">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">All Platform Bids</h1>
            <p className="text-white/70">
              Monitor all platform bidding activity
            </p>
            <Tabs type={"admin"} />
          </div>
        </div>

        {/* Content Area */}

        <>
          {filteredBids.length > 0 ? (
            <div className="grid grid-cols-1 gap-6">
              {filteredBids.map((bid) => (
                <BidWithNFT type={"admin"} key={bid._id} bid={bid} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 glass-card">
              <div className="mb-4">
                <Gavel
                  size={30}
                  className="max-w-md mx-auto text-5xl text-white/20"
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
            </div>
          )}
        </>
      </div>
    </div>
  );
}
