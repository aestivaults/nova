"use client";

import { useSetParams } from "@/app/hooks/useSetParams";
import { Bid } from "@/app/types/bids";

export default function Tabs({
  type,
  filteredBids,
}: {
  type: "admin" | "user" | "owner";
  filteredBids: Bid[];
}) {
  const { setParams, searchParams } = useSetParams();
  const activeTab = searchParams.get("current") || "active";

  const getTabs = () => {
    if (type === "user") {
      return [
        { id: "active", label: "Active Bids" },
        { id: "outbid", label: "Outbid" },
        { id: "history", label: "History" },
      ];
    } else if (type === "owner") {
      return [
        { id: "active", label: "Pending" },
        { id: "history", label: "History" },
      ];
    } else {
      return [
        { id: "active", label: "Active" },
        { id: "history", label: "History" },
        { id: "suspicious", label: "Suspicious" },
      ];
    }
  };

  const handleTabChange = (tab: string) => {
    setParams({ current: tab });
  };

  return (
    <div className="tabs mb-8">
      {getTabs().map((tab) => (
        <button
          key={tab.id}
          className={`tab ${activeTab === tab.id ? "active" : ""}`}
          onClick={() => handleTabChange(tab.id)}
        >
          {tab.label}
          {tab.id === "suspicious" && filteredBids.length > 0 && (
            <span className="ml-2 px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
              {filteredBids.length}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
