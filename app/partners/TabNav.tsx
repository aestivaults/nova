"use client";

import Button from "../components/ui/button";
import { useSetParams } from "../hooks/useSetParams";

export default function TabNav() {
  const { searchParams, setParams } = useSetParams();
  const activeTab = searchParams.get("tab") || "overview";

  const renderTab = (label: string, value: string) => (
    <Button
      key={value}
      variant={activeTab === value ? "primary" : "secondary"}
      onClick={() => setParams({ tab: value })}
    >
      <span
        className={`relative z-10 ${activeTab === value ? "font-semibold" : ""}`}
      >
        {label}
      </span>
    </Button>
  );
  return (
    <div className="relative mb-12 sm:mb-16">
      <div className="relative flex flex-wrap justify-center gap-2 sm:gap-3 bg-black/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-1">
        {[
          { label: "Overview", value: "overview" },
          { label: "Tiers", value: "tiers" },
          { label: "Integration", value: "integration" },
          { label: "Apply", value: "apply" },
        ].map((tab) => renderTab(tab.label, tab.value))}
      </div>
    </div>
  );
}
