import { Edit, TriangleAlertIcon } from "lucide-react";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import Button from "../components/ui/button";
import NavTabs from "../components/ui/Tabs";
import { ActionButtonList } from "../components/WalletConnectKit/ActionButtonList";
import { createServerApi } from "../utils/api";
import { formatEthPrice } from "../utils/formatters";
import DashboardWrapper from "./Dashboard";

export default async function CustomerDashboard() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;
  const serverApi = createServerApi(token, refreshToken);

  const [userResult, bidsResult, likedNFTsResult, ownerNfts, ownerCollections] =
    await Promise.allSettled([
      serverApi.get("/users"),
      serverApi.get("/users/bids"),
      serverApi.get("/users/likes"),
      serverApi.get("/users/nfts"),
      serverApi.get("/users/collections"),
    ]);

  if (userResult.status !== "fulfilled")
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center container py-16 glass-card">
          <div className="mb-4">
            <TriangleAlertIcon
              size={50}
              className="text-4xl max-w-lg mx-auto text-red-500 mb-4"
            />
          </div>
          <h3 className="text-xl font-medium mb-2">Something went wrong</h3>
          <p className="text-white/60 mb-6">Please try again</p>
        </div>
      </div>
    );

  const user = userResult.value.data.data;

  if (user instanceof Error)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center container py-16 glass-card">
          <div className="mb-4">
            <TriangleAlertIcon
              size={50}
              className="text-4xl max-w-lg mx-auto text-red-500 mb-4"
            />
          </div>
          <h3 className="text-xl font-medium mb-2">Something went wrong</h3>
          <p className="text-white/60 mb-6">Please try again</p>
        </div>
      </div>
    );

  const activeBids =
    bidsResult.status === "fulfilled" && !(bidsResult.value instanceof Error)
      ? bidsResult.value.data.data
      : [];
  const likedNFTS =
    likedNFTsResult.status === "fulfilled" &&
    !(likedNFTsResult.value instanceof Error)
      ? likedNFTsResult.value.data.data
      : [];

  const userNfts =
    ownerNfts.status === "fulfilled" && !(ownerNfts.value instanceof Error)
      ? ownerNfts.value.data.data
      : [];

  const userCollections =
    ownerCollections.status === "fulfilled" &&
    !(ownerCollections.value instanceof Error)
      ? ownerCollections.value.data.data
      : [];

  return (
    <div className="py-25">
      <div className="container">
        <div className="glass-card p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
            <div className="relative w-24 h-24 overflow-hidden rounded-full border-4 border-primary-500">
              <Image
                src={user?.avatar || "/pfp.png"}
                alt={user?.username || "username"}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl mb-3 font-bold">
                {user?.name || "Customer"}
              </h1>
              {user?.owner_id && <p className="my-2">Connect Wallet</p>}

              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <Link href={"/dashboard/settings"}>
                  <Button variant="secondary" size="small" icon={<Edit />}>
                    Edit Profile
                  </Button>
                </Link>

                {!user?.owner_id && <ActionButtonList />}
              </div>
            </div>

            <div className="flex flex-col items-center md:items-end">
              <div className="text-center md:text-right">
                <p className="text-white/60">Balance</p>
                <p className="text-xl font-bold text-primary-400">
                  {formatEthPrice(user?.walletBalance ?? 0)}
                </p>
              </div>

              <div className="flex gap-4 mt-4">
                <Link href={"/dashboard/create-nft"}>
                  <Button variant="outline">Create NFT</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <NavTabs tabs={tabs} />

        <DashboardWrapper
          LikedNFTS={likedNFTS}
          usernfts={userNfts}
          activeBids={activeBids}
          collections={userCollections}
          user={user}
        />
      </div>
    </div>
  );
}

const tabs = [
  { key: "overview", label: "Overview" },
  { key: "owned", label: "My NFTs" },
  { key: "bids", label: "My Bids" },
  { key: "liked", label: "Liked NFTs" },
  { key: "collections", label: "My Collections" },
];
