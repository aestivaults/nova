"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const activeTab = usePathname();
  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-white/70">Manage and monitor your NFT platform</p>
        </div>
      </div>

      <div className="tabs mb-8">
        {tabs.map((tab) => (
          <Link
            href={tab.key}
            key={tab.key}
            className={`tab ${activeTab === tab.key ? "active" : ""}`}
          >
            {tab.label}
          </Link>
        ))}
      </div>
    </>
  );
}

const tabs = [
  { key: "/admin", label: "Overview" },
  { key: "/admin/users", label: "User Management" },
  { key: "/admin/transactions", label: "Transactions" },
  { key: "/admin/reports", label: "Reports" },
  { key: "/admin/settings", label: "Settings" },
];
