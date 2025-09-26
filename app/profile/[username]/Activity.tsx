import { Download, Filter, Inbox } from "lucide-react";
import Button from "../../components/ui/button";
import { formatRelativeTime } from "../../utils/formatters";
import { NotificationPayload } from "@/app/types/notification";
import { getActivityIcon } from "@/app/utils/getIcons";

export default function Activity({
  notifications,
}: {
  notifications: NotificationPayload[];
}) {
  return (
    <div className="glass-card p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold">Recent Activity</h3>
        <div className="flex gap-2">
          <Button variant="outline" size="small">
            <Filter className="mr-1" /> Filter
          </Button>
          <Button variant="outline" size="small">
            <Download className="mr-1" /> Export
          </Button>
        </div>
      </div>

      {notifications.length > 0 ? (
        <div className="divide-y divide-white/10">
          {notifications.map((notice) => (
            <div key={notice._id} className="py-4 flex items-center">
              <div className="w-10 h-10 rounded-full bg-primary-900/50 flex items-center justify-center text-primary-400 mr-4">
                {getActivityIcon(notice.action)}
              </div>
              <div className="flex-1">
                <p className="font-medium">{notice.message}</p>
                <p className="text-sm text-white/60">
                  {formatRelativeTime(notice.createdAt)}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-16 flex flex-col items-center justify-center text-white/60">
          <Inbox size={48} className="mb-4" />
          <p className="text-lg font-semibold">No recent activity</p>
          <p className="mt-2 text-sm max-w-xs text-center">
            You don’t have any notifications yet. Once you do, they’ll show up
            here.
          </p>
        </div>
      )}
    </div>
  );
}
