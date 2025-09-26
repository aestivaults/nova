"use client";
import { useSetParams } from "@/app/hooks/useSetParams";

export default function NavTabs({
  tabs,
}: {
  tabs: { key: string; label: string }[];
}) {
  const { setParams, searchParams } = useSetParams();

  const activeTab = searchParams.get("tab") || tabs[0]?.key;
  const handleTabChange = (tab: string) => {
    setParams({ tab: tab });
  };
  return (
    <div className="tabs mb-8">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          className={`tab ${activeTab === tab.key ? "active" : ""}`}
          onClick={() => handleTabChange(tab.key)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
