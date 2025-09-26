"use client";
import Button from "../components/ui/button";
import {
  formatDate,
  formatEthPrice,
  truncateAddress,
} from "../utils/formatters";
import { getStatusBadge } from "../utils/getIcons";
import { TransactionProps } from "../types/transactions";
import { PaginationProps } from "../types/pagination";
import Pagination from "../components/ui/Pagination";

export default function Transactions({
  transactions,
  pagination,
}: {
  transactions: TransactionProps[];
  pagination: PaginationProps;
}) {
  return (
    <div className="glass-card">
      <div className="p-4 border-b border-white/10 flex justify-between items-center">
        <h3 className="font-medium">Transaction Management</h3>

        <div className="flex gap-3">
          <select className="form-select py-2 text-sm">
            <option value="all">All Types</option>
            <option value="withdraw">Withdrawals</option>
            <option value="sale">Sales</option>
            <option value="mint">Minting</option>
            <option value="bid">Bids</option>
          </select>

          <select className="form-select py-2 text-sm">
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="failed">Failed</option>
          </select>
        </div>
      </div>

      {/* Transaction Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead className="bg-white/5">
            <tr>
              <th className="p-3 text-left text-sm font-medium text-white/60">
                ID
              </th>
              <th className="p-3 text-left text-sm font-medium text-white/60">
                Type
              </th>
              <th className="p-3 text-left text-sm font-medium text-white/60">
                User
              </th>
              <th className="p-3 text-left text-sm font-medium text-white/60">
                Amount
              </th>
              <th className="p-3 text-left text-sm font-medium text-white/60">
                Wallet
              </th>
              <th className="p-3 text-left text-sm font-medium text-white/60">
                Date
              </th>
              <th className="p-3 text-left text-sm font-medium text-white/60">
                Status
              </th>
              <th className="p-3 text-right text-sm font-medium text-white/60">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {transactions.map((tx, index) => (
              <tr key={`${tx._id}-${index}`} className="hover:bg-white/5">
                <td className="p-3 text-sm font-mono">{tx._id}</td>
                <td className="p-3">
                  <span className="capitalize text-sm">{tx.type}</span>
                </td>
                <td className="p-3 text-sm">{tx.user.name}</td>
                <td className="p-3 font-medium">{formatEthPrice(tx.amount)}</td>
                <td className="p-3 text-sm font-mono">
                  {tx.user.owner_id ? truncateAddress(tx.user.owner_id) : "N/A"}
                </td>
                <td className="p-3 text-sm">
                  {formatDate(tx.createdAt, "datetime")}
                </td>
                <td className="p-3">{getStatusBadge(tx.status)}</td>
                <td className="p-3 text-right">
                  <div className="flex gap-2 justify-end">
                    <Button
                      variant="outline"
                      size="small"
                      className="text-red-400 border-red-400/30 hover:bg-red-400/10"
                    >
                      Reject
                    </Button>

                    <Button
                      variant="outline"
                      size="small"
                      className="text-green-400 border-green-400/30 hover:bg-green-400/10"
                    >
                      Approve
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="p-4 border-t border-white/10 flex justify-between items-center">
        <div className="text-sm text-white/60">
          Showing {transactions.length} of {pagination.total} transactions
        </div>

        <Pagination pagination={pagination} />
      </div>
    </div>
  );
}
