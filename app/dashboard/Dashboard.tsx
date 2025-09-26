"use client";
import LikedNFTs from "./LikedNfts";
import MyBids from "./MyBids";
import MyCollections from "./MyCollections";
import Overview from "./Overview";
import UserNFTS from "./UserNfts";
import { useSetParams } from "../hooks/useSetParams";
import { NftPayload } from "../types/nftTypes";
import { User } from "../types/user";
import { Bid } from "../types/bids";
import { CollectionPayload } from "../types/collection";

export default function DashboardWrapper({
  usernfts,
  user,
  activeBids,
  LikedNFTS,
  collections,
}: {
  usernfts: NftPayload[] | undefined;
  user: User;
  activeBids: Bid[];
  collections: CollectionPayload[];
  LikedNFTS: NftPayload[];
}) {
  const { searchParams } = useSetParams();
  const activeTab = searchParams.get("tab") || "overview";
  const { setParams } = useSetParams();

  const handleTabChange = (tab: string) => {
    setParams({ tab: tab });
  };
  return (
    <div>
      {activeTab === "overview" && (
        <Overview
          activeBids={activeBids}
          user={user}
          handleTabChange={handleTabChange}
          ownedNFTs={usernfts}
        />
      )}

      {activeTab === "owned" && <UserNFTS ownedNFTs={usernfts} />}
      {activeTab === "bids" && <MyBids activeBids={activeBids} />}
      {activeTab === "liked" && <LikedNFTs LikedNFTS={LikedNFTS} />}
      {activeTab === "collections" && (
        <MyCollections collections={collections} />
      )}
    </div>
  );
}
