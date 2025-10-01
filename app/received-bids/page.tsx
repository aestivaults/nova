import { cookies } from "next/headers";
import Tabs from "../admin/bids/BidTabs";
import BidWithNFT from "../admin/bids/BidwithNft";
import { Bid } from "../types/bids";
import { createServerApi } from "../utils/api";
import Navbar from "../components/layout/navbar";
import Footer from "../components/layout/Footer";

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

  const res = await serverapi.get("/bids/received");
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
    <div className="pt-25">
      <Navbar />
      <div className="container min-h-screen">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Bids on Your NFTs</h1>
            <p className="text-white/70">Manage bids on your NFTs</p>
            <Tabs type={"owner"} filteredBids={filteredBids} />
          </div>
        </div>

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
      <Footer />
    </div>
  );
}
