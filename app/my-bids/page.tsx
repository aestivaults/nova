import Link from "next/link";
import Tabs from "../admin/bids/BidTabs";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/navbar";
import Button from "../components/ui/button";
import { getUserBids } from "../lib/serverFunctions";
import { Bid } from "../types/bids";
import BidsList from "./BidsList";

export default async function Bidding({
  searchParams,
}: {
  searchParams: Promise<{ current: string }>;
}) {
  const params = await searchParams;
  const activeTab = params.current || "active";

  let userBids: Bid[] = [];
  try {
    userBids = await getUserBids();
  } catch (error) {
    console.log(error);
    userBids = [];
  }

  return (
    <div className="pt-25">
      <Navbar />
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Bids</h1>
            <p className="text-white/70">Track all your auction activity</p>
            <Tabs type={"user"} />
          </div>

          <div className="mt-4 md:mt-0">
            <Link href={"/marketplace"}>
              <Button>Browse Auctions</Button>
            </Link>
          </div>
        </div>

        <BidsList initialBids={userBids} activeTab={activeTab} />
      </div>
      <Footer />
    </div>
  );
}
