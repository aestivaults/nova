import { queryClient } from "../context/TanstackQueryClient";
import { getTransactions, getUsers } from "../lib/serverFunctions";
import { TransactionProps } from "../types/transactions";
import { User } from "../types/user";
import Header from "./Header";
import Overview from "./Overview";

export default async function AdminDashboard() {
  const [users, transactions] = await Promise.allSettled([
    getUsers(),
    getTransactions(),
  ]);

  const rawUsers = users.status !== "fulfilled" ? [] : users.value.data;
  const rawTransactions =
    transactions.status !== "fulfilled" ? [] : transactions.value.data;

  queryClient.setQueryData(["users"], rawUsers);
  queryClient.setQueryData(["transactions"], rawTransactions);
  return (
    <div className="py-25">
      <div className="container">
        <Header />

        <Overview
          users={rawUsers as User[]}
          transactions={rawTransactions as TransactionProps[]}
        />
      </div>
    </div>
  );
}
