import { cookies } from "next/headers";
import Tabs from "../admin/bids/BidTabs";
import BidWithNFT from "../admin/bids/BidwithNft";
import Button from "../components/ui/button";
import { Bid } from "../types/bids";
import { createServerApi } from "../utils/api";
import Link from "next/link";
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

  let userBids: Bid[] = [];

  const res = await serverapi.get("/admin/bids");
  if (res.data.data) userBids = res.data.data;

  const getFilteredBids = () => {
    // Filter by status
    switch (activeTab) {
      case "active":
        return userBids.filter((bid) =>
          ["active", "pending"].includes(bid.status)
        );
      case "history":
        return userBids.filter((bid) =>
          ["won", "lost", "accepted", "rejected"].includes(bid.status)
        );
      case "outbid":
        return userBids.filter((bid) => bid.status === "outbid");

      default:
        return userBids;
    }
  };

  const filteredBids = getFilteredBids();

  return (
    <div className="py-25">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Bids</h1>
            <p className="text-white/70">Track all your auction activity</p>
            <Tabs type={"user"} filteredBids={filteredBids} />
          </div>

          <div className="mt-4 md:mt-0">
            <Link href={"/marketplace"}>
              <Button>Browse Auctions</Button>
            </Link>
          </div>
        </div>

        <>
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
        </>
      </div>
    </div>
  );
}
