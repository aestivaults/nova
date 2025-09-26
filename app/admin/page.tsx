import { cookies } from "next/headers";
import NavTabs from "../components/ui/Tabs";
import { createServerApi } from "../utils/api";
import Overview from "./Overview";
import Reports from "./Reports";
import Settings from "./settings";
import Transactions from "./Transactions";
import Users from "./users";
import { User } from "../types/user";
import { TransactionProps } from "../types/transactions";
import { PaginationProps } from "../types/pagination";

export default async function AdminDashboard({
  searchParams,
}: {
  searchParams: Promise<{ tab: string; page: number }>;
}) {
  const params = await searchParams;
  const activeTab = params.tab || "overview";
  const page = params.page || 1;
  const cookieStore = await cookies();
  const accesstoken = cookieStore.get("token")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  const serverapi = createServerApi(accesstoken, refreshToken);

  const [users, transactions] = await Promise.allSettled([
    serverapi.get(`/admin/users?page=${page}&limit=${15}`),
    serverapi.get(`/admin/transactions?page=${page}&limit=${10}`),
  ]);

  const rawusers = users.status !== "fulfilled" ? [] : users.value.data;
  const rawTransactions =
    transactions.status !== "fulfilled" ? [] : transactions.value.data;

  return (
    <div className="py-25">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-white/70">
              Manage and monitor your NFT platform
            </p>
          </div>
        </div>
        <NavTabs tabs={tabs} />
        {activeTab === "overview" && (
          <Overview
            users={rawusers.data as User[]}
            transactions={rawTransactions.data as TransactionProps[]}
          />
        )}
        {activeTab === "users" && (
          <Users
            users={rawusers.data as User[]}
            transactions={rawTransactions.data as TransactionProps[]}
            pagination={rawusers.pagination as PaginationProps}
          />
        )}
        {activeTab === "transactions" && (
          <Transactions
            pagination={rawTransactions.pagination as PaginationProps}
            transactions={rawTransactions.data as TransactionProps[]}
          />
        )}
        {activeTab === "reports" && <Reports />}
        {activeTab === "settings" && <Settings />}
      </div>
    </div>
  );
}

const tabs = [
  { key: "overview", label: "Overview" },
  { key: "users", label: "User Management" },
  { key: "transactions", label: "Transactions" },
  { key: "reports", label: "Reports" },
  { key: "settings", label: "Settings" },
];
