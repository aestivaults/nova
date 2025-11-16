import { Edit } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/navbar";
import Button from "../components/ui/button";
import DashboardProvider from "../context/DashboardProvider";
import { getUser, getUserBids, getUserNfts } from "../lib/serverFunctions";
import { Bid } from "../types/bids";
import { NftPayload } from "../types/nftTypes";
import { User } from "../types/user";
import { formatEthPrice } from "../utils/formatters";
import DashboardTabs from "./DashboardTabs";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let user: User | null = null;

  try {
    user = await getUser();
  } catch (error) {
    console.log(error);
  }

  const userBids = await getUserBids();
  const userNfts = await getUserNfts();

  return (
    <DashboardProvider Bids={userBids as Bid[]} Nfts={userNfts as NftPayload[]}>
      <Navbar />
      <div className="py-25">
        <div className="container">
          <div className="glass-card p-3 md:p-6 mb-8">
            <div className="flex gap-1.5 md:gap-6 items-start">
              <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-primary-500">
                <Image
                  sizes="40px"
                  fill
                  src={user?.avatar || "/pfp.png"}
                  alt={user?.username || "username"}
                  className="object-cover"
                />
              </div>

              <div className="flex-1 md:text-left">
                <h1 className="text-md sm:text-lg md:text-2xl mb-3 font-bold">
                  {user?.name || "Customer"}
                </h1>

                <Link href={"/settings"} className="mt-4">
                  <Button variant="outline" size="small" icon={<Edit />}>
                    <span>Edit Profile</span>
                  </Button>
                </Link>
              </div>

              <div className="flex flex-col items-center md:items-end">
                <div className="text-center md:text-right">
                  <p className="text-white/60">Balance</p>
                  <p className="text-md md:text-xl font-bold text-primary-400">
                    {formatEthPrice(user?.walletBalance ?? 0)}
                  </p>
                </div>

                <Link href={"/create-nft"}>
                  <Button variant="outline">Create NFT</Button>
                </Link>
              </div>
            </div>
          </div>
          <DashboardTabs />
          {children}{" "}
        </div>
      </div>
      <Footer />
    </DashboardProvider>
  );
}
