"use client";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getUserCollections, getUserLikes } from "../lib/clientFunctions";

export default function DashboardTabs() {
  const activeTab = usePathname();
  const queryClient = useQueryClient();

  const prefetchData = async (key: string) => {
    if (key === "collections") {
      queryClient.prefetchQuery({
        queryKey: ["user-collections"],
        queryFn: getUserCollections,
      });
    } else if (key === "likes") {
      queryClient.prefetchQuery({
        queryKey: ["user-likes"],
        queryFn: getUserLikes,
      });
    }
  };

  return (
    <div className="tabs mb-8">
      {tabs.map((tab) => (
        <Link
          onMouseEnter={() => prefetchData(tab.key)}
          href={`/dashboard/${tab.key}`}
          key={tab.key}
          className={`tab ${activeTab === `/dashboard/${tab.key}` ? "active" : ""}`}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  );
}

const tabs = [
  { key: "", label: "Home" },
  { key: "my-nfts", label: "My NFTs" },
  { key: "bids", label: "My Bids" },
  { key: "likes", label: "Liked NFTs" },
  { key: "collections", label: "My Collections" },
];
