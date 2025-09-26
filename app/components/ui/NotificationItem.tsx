// Notification Components
"use client";

import { NotificationPayload } from "@/app/types/notification";
import { formatRelativeTime } from "@/app/utils/formatters";
import { getActivityIcon } from "@/app/utils/getIcons";

export default function NotificationItem({
  notification,
  onRead,
  onDelete,
  className = "",
}: {
  notification: NotificationPayload;
  onRead: (nft: string) => void;
  onDelete: (nft: string) => void;
  className?: string;
}) {
  return (
    <div
      className={`
      notification-item p-4 hover:bg-white/5 transition-colors
      border-b border-white/10 last:border-0
      ${notification.isRead ? "opacity-70" : ""}
      ${className}
    `}
    >
      <div className="flex">
        <div className="mr-3 mt-1">
          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
            {getActivityIcon(notification.action)}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="flex justify-between items-start mb-1">
            <h4 className="font-medium text-sm">{notification.title}</h4>
            <div className="flex items-center">
              <span className="text-xs text-white/50">
                {formatRelativeTime(notification.createdAt)}
              </span>

              {!notification.isRead && (
                <span className="ml-2 w-2 h-2 rounded-full bg-primary-500"></span>
              )}
            </div>
          </div>

          <p className="text-sm text-white/70 mb-2">{notification.message}</p>

          {/* Actions */}
          <div className="flex justify-between">
            {
              !notification.isRead ? (
                <button
                  className="text-xs text-primary-400 hover:text-primary-300"
                  onClick={() => onRead && onRead(notification._id)}
                >
                  Mark as Read
                </button>
              ) : (
                <span></span>
              ) // Empty span for spacing
            }

            <button
              className="text-xs text-white/50 hover:text-white/70"
              onClick={() => onDelete && onDelete(notification._id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
