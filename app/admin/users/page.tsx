"use client";
import Button from "@/app/components/ui/button";
import Pagination from "@/app/components/ui/Pagination";
import { useSetParams } from "@/app/hooks/useSetParams";
import { getUsers } from "@/app/lib/clientFunctions";
import { User } from "@/app/types/user";
import { formatDate, truncateAddress } from "@/app/utils/formatters";
import { useQuery } from "@tanstack/react-query";
import { BanIcon, CheckCircle, Edit, Search, UserPlus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Header from "../Header";
import Loader from "../loading";

export default function Users() {
  const [query, setQuery] = useState("");

  const { searchParams } = useSetParams();
  const page = searchParams.get("page") || 1;

  const { data: response, isLoading } = useQuery({
    queryKey: ["users", page],
    queryFn: getUsers,
  });

  if (isLoading) return <Loader />;

  const { data, pagination } = response;
  const users = data as User[];

  const filteredUsers = !query
    ? users
    : users.filter((user) => {
        const lowerQuery = query.toLowerCase();
        return (
          user.name.toLowerCase().includes(lowerQuery) ||
          user.email.toLowerCase().includes(lowerQuery) ||
          user._id.toString().toLowerCase().includes(lowerQuery)
        );
      });

  return (
    <div className="py-25">
      <div className="container">
        <Header />

        <div className="glass-card">
          <div className="p-4 border-b border-white/10 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            {/* Title */}
            <h3 className="text-lg font-medium">User Management</h3>

            {/* Search + Button */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
              {/* Search Input */}
              <div className="relative flex-1">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  type="text"
                  className="form-input w-full pr-10 py-2 text-sm rounded-md bg-white/5 border border-white/10 placeholder-white/40 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Search users..."
                />

                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <Search className="text-white/40 w-4 h-4" />
                </div>
              </div>

              {/* Add User Button */}
              <Button
                variant="primary"
                size="small"
                icon={<UserPlus />}
                className="w-full sm:w-auto"
              >
                Add User
              </Button>
            </div>
          </div>

          {/* User Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead className="bg-white/5">
                <tr>
                  <th className="p-3 text-left text-sm font-medium text-white/60">
                    User
                  </th>
                  <th className="p-3 text-left text-sm font-medium text-white/60">
                    Email
                  </th>
                  <th className="p-3 text-left text-sm font-medium text-white/60">
                    Wallet
                  </th>
                  <th className="p-3 text-left text-sm font-medium text-white/60">
                    Role
                  </th>
                  <th className="p-3 text-left text-sm font-medium text-white/60">
                    Joined
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
                {filteredUsers.map((user, index) => (
                  <tr key={`${user._id}-${index}`} className="hover:bg-white/5">
                    <td className="p-3">
                      <div className="flex items-center">
                        <div className="relative w-8 h-8 overflow-hidden rounded-full mr-3">
                          <Image
                            src={user.avatar || "/pfp.png"}
                            alt={user.email}
                            sizes="32px"
                            className="object-cover"
                            fill
                          />
                        </div>

                        <div>
                          <div className="flex items-center">
                            <span className="font-medium">{user.username}</span>
                            {user.isVerified && (
                              <CheckCircle className=" text-primary-500 ml-1 text-xs" />
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-3 text-sm">{user.email}</td>
                    <td className="p-3 text-sm font-mono">
                      {truncateAddress(user.owner_id)}
                    </td>
                    <td className="p-3">
                      <span className="text-xs capitalize px-2 py-0.5 bg-white/10 rounded-full">
                        {user.role}
                      </span>
                    </td>
                    <td className="p-3 text-sm">
                      {formatDate(user.createdAt, "short")}
                    </td>
                    <td className="p-3">
                      <span className="px-2 py-1 rounded-full text-xs bg-green-900/30 text-green-400">
                        Active
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <div className="flex gap-2 justify-end">
                        <Button variant="text" size="small" title="Edit User">
                          <Edit />
                        </Button>
                        <Button
                          variant="danger"
                          size="small"
                          title="Disable User"
                        >
                          <BanIcon />
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
              Showing {filteredUsers.length} of {pagination.total} users
            </div>

            <Pagination pagination={pagination} />
          </div>
        </div>
      </div>
    </div>
  );
}
