"use client";
import {
  CheckCircle2,
  ChevronRight,
  Cog,
  Download,
  UserPlus,
} from "lucide-react";
import Button from "../components/ui/button";
import { User } from "../types/user";
import {
  formatEthPrice,
  formatRelativeTime,
  truncateAddress,
} from "../utils/formatters";
import { reportedItems } from "./admindata";
import Link from "next/link";
import { TransactionProps } from "../types/transactions";

export default function Overview({
  users,
  transactions,
}: {
  users: User[];
  transactions: TransactionProps[];
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Recent Users */}
      <div className="glass-card h-fit md:col-span-2">
        <div className="flex justify-between items-center p-4 border-b border-white/10">
          <h3 className="font-medium">Recent Users</h3>
          <Button
            variant="text"
            size="small"
            // onClick={() => handleTabChange("users")}
          >
            View All
          </Button>
        </div>

        <div className="divide-y divide-white/10">
          {users.map((user) => (
            <div key={user._id} className="p-4 flex items-center">
              <div className="mr-4">
                <img
                  src={user.avatar}
                  alt={user.username}
                  className="w-10 h-10 rounded-full"
                />
              </div>

              <div className="flex-1">
                <div className="flex items-center">
                  <h4 className="font-medium">{user.username}</h4>
                  {user.isVerified && (
                    <CheckCircle2 className=" text-primary-500 ml-1 text-sm" />
                  )}
                </div>
                <div className="text-sm text-white/60 flex items-center">
                  <span className="mr-2">{user.email}</span>
                  <span className="text-xs capitalize px-2 py-0.5 bg-white/10 rounded-full">
                    {user.role}
                  </span>
                </div>
              </div>

              <div className="text-right text-sm">
                <div>Joined {formatRelativeTime(user.createdAt)}</div>
                <div className="text-white/60 font-mono text-xs">
                  {truncateAddress(user.owner_id)}
                </div>
              </div>

              <div className="ml-4">
                <Link href={`/profile/${user.username}`}>
                  <Button variant="text" size="small" title="View User">
                    <ChevronRight />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions and Pending Approvals */}
      <div className="flex flex-col gap-6">
        {/* Quick Actions */}
        <div className="glass-card">
          <div className="p-4 border-b border-white/10">
            <h3 className="font-medium">Quick Actions</h3>
          </div>

          <div className="p-4 space-y-3">
            <Button variant="primary" fullWidth icon={<UserPlus />}>
              Add New User
            </Button>

            <Button variant="secondary" fullWidth icon={<Cog />}>
              Platform Settings
            </Button>

            <Button variant="secondary" fullWidth icon={<Download />}>
              Export Reports
            </Button>
          </div>
        </div>

        {/* Pending Transactions */}
        <div className="glass-card">
          <div className="flex justify-between items-center p-4 border-b border-white/10">
            <h3 className="font-medium">Pending Transactions</h3>
            <Button
              variant="text"
              size="small"
              //   onClick={() => handleTabChange("transactions")}
            >
              View All
            </Button>
          </div>

          <div className="divide-y divide-white/10">
            {transactions &&
              transactions.length > 0 &&
              transactions.slice(0, 3).map((tx) => (
                <div key={tx._id} className="p-4">
                  <div className="flex justify-between mb-2">
                    <div className="flex items-center">
                      <span className="capitalize font-medium mr-2">
                        {tx.type}
                      </span>
                      <span className="text-white/60">by {tx.user.name}</span>
                    </div>
                    <div className="font-medium">
                      {formatEthPrice(tx.amount)}
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="text-sm text-white/60">
                      {formatRelativeTime(tx.createdAt)}
                    </div>

                    <div className="flex gap-2">
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
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Reported Items */}
        <div className="glass-card">
          <div className="flex justify-between items-center p-4 border-b border-white/10">
            <h3 className="font-medium">
              Reported Items
              {reportedItems.length > 0 && (
                <span className="ml-2 px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
                  {reportedItems.length}
                </span>
              )}
            </h3>
            <Button
              variant="text"
              size="small"
              //   onClick={() => handleTabChange("reports")}
            >
              View All
            </Button>
          </div>

          <div className="divide-y divide-white/10">
            {reportedItems.slice(0, 2).map((item) => (
              <div key={item.id} className="p-4">
                <div className="flex justify-between mb-2">
                  <div>
                    <span className="font-medium mr-2">{item.title}</span>
                    <span className="text-xs px-2 py-0.5 bg-white/10 rounded-full capitalize">
                      {item.type}
                    </span>
                  </div>
                  <div className="text-white/60 text-sm">
                    {formatRelativeTime(item.timestamp)}
                  </div>
                </div>

                <p className="text-sm text-white/70 mb-2">
                  <span className="text-white/50 mr-1">Reason:</span>
                  {item.reason}
                </p>

                <div className="flex justify-between items-center">
                  <div className="text-sm text-white/60">
                    Reported by: {item.reportedBy}
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="small"
                      className="text-red-400 border-red-400/30 hover:bg-red-400/10"
                    >
                      Remove
                    </Button>

                    <Button
                      variant="outline"
                      size="small"
                      className="text-green-400 border-green-400/30 hover:bg-green-400/10"
                    >
                      Dismiss
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
