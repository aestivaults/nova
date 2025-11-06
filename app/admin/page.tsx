import { QueryClient } from "@tanstack/react-query";
import { getTransactions, getUsers } from "../lib/serverFunctions";
import { TransactionProps } from "../types/transactions";
import { User } from "../types/user";
import Header from "./Header";
import Overview from "./Overview";

export default async function AdminDashboard() {
  const queryClient = new QueryClient();

  const [users, transactions] = await Promise.allSettled([
    getUsers(),
    getTransactions(),
  ]);

  const rawusers = users.status !== "fulfilled" ? [] : users.value.data;
  const rawTransactions =
    transactions.status !== "fulfilled" ? [] : transactions.value.data;

  queryClient.setQueryData(["transactions"], rawTransactions);
  queryClient.setQueryData(["users"], rawusers.data);
  return (
    <div className="py-25">
      <div className="container">
        <Header />

        <Overview
          users={rawusers as User[]}
          transactions={rawTransactions as TransactionProps[]}
        />
      </div>
    </div>
  );
}
