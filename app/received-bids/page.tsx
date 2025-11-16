import Tabs from "../admin/bids/BidTabs";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/navbar";
import { getReceivedBid } from "../lib/serverFunctions";
import { Bid } from "../types/bids";
import ReceivedBids from "./Received-bids";

export default async function Bidding({
  searchParams,
}: {
  searchParams: Promise<{ current: string }>;
}) {
  const params = await searchParams;
  const activeTab = params.current || "active";

  let userBids: Bid[] = [];

  try {
    userBids = await getReceivedBid();
  } catch (error) {
    console.log("something went wrong", error);
    userBids = [];
  }

  return (
    <div className="pt-25">
      <Navbar />
      <div className="container min-h-screen">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Bids on Your NFTs</h1>
            <p className="text-white/70">Manage bids on your NFTs</p>
            <Tabs type={"owner"} />
          </div>
        </div>

        <ReceivedBids initialData={userBids} activeTab={activeTab} />
      </div>
      <Footer />
    </div>
  );
}
