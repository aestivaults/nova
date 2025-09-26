"use client";
import { Eye, FolderSync } from "lucide-react";
import Button from "../components/ui/button";
import { formatDate } from "../utils/formatters";
import { reportedItems } from "./admindata";

export default function Reports() {
  return (
    <div className="glass-card">
      <div className="p-4 border-b border-white/10 flex justify-between items-center">
        <h3 className="font-medium">
          Reported Items
          {reportedItems.length > 0 && (
            <span className="ml-2 px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
              {reportedItems.length}
            </span>
          )}
        </h3>

        <div className="flex gap-3">
          <select className="form-select py-2 text-sm">
            <option value="all">All Types</option>
            <option value="nft">NFTs</option>
            <option value="collection">Collections</option>
            <option value="user">Users</option>
          </select>

          <Button variant="secondary" size="small" icon={<FolderSync />}>
            Refresh
          </Button>
        </div>
      </div>

      {/* Reports Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead className="bg-white/5">
            <tr>
              <th className="p-3 text-left text-sm font-medium text-white/60">
                Item
              </th>
              <th className="p-3 text-left text-sm font-medium text-white/60">
                Type
              </th>
              <th className="p-3 text-left text-sm font-medium text-white/60">
                Creator
              </th>
              <th className="p-3 text-left text-sm font-medium text-white/60">
                Reason
              </th>
              <th className="p-3 text-left text-sm font-medium text-white/60">
                Reported By
              </th>
              <th className="p-3 text-left text-sm font-medium text-white/60">
                Date
              </th>
              <th className="p-3 text-right text-sm font-medium text-white/60">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {[...reportedItems, ...reportedItems].map((item, index) => (
              <tr key={`${item.id}-${index}`} className="hover:bg-white/5">
                <td className="p-3 font-medium">{item.title}</td>
                <td className="p-3">
                  <span className="text-xs capitalize px-2 py-0.5 bg-white/10 rounded-full">
                    {item.type}
                  </span>
                </td>
                <td className="p-3 text-sm">{item.creator}</td>
                <td className="p-3 text-sm">{item.reason}</td>
                <td className="p-3 text-sm">{item.reportedBy}</td>
                <td className="p-3 text-sm">
                  {formatDate(item.timestamp, "datetime")}
                </td>
                <td className="p-3 text-right">
                  <div className="flex gap-2 justify-end">
                    <Button variant="text" size="small" title="View Details">
                      <Eye />
                    </Button>

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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
