"use client";

import { useSetParams } from "@/app/hooks/useSetParams";

export default function Tabs({ type }: { type: "admin" | "user" | "owner" }) {
  const { setParams, searchParams } = useSetParams();
  const activeTab = searchParams.get("current") || "active";

  const getTabs = () => {
    if (type === "user") {
      return [
        { id: "active", label: "Active Bids" },
        { id: "won", label: "Won Bids" },
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
        </button>
      ))}
    </div>
  );
}
