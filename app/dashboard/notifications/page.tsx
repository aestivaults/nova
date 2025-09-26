"use client";
import NotificationItem from "@/app/components/ui/NotificationItem";
import { useNotifications } from "@/app/context/NotificationProvider";
import { BellOff } from "lucide-react";

export default function NotificationCenter() {
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
  } = useNotifications();

  return (
    <section className="py-25 min-h-screen">
      <div className="container">
        <h1 className="font-medium my-3">Notifications</h1>

        <div className="mt-2  min-h-[200px] overflow-y-auto glass-card shadow-lg rounded-lg z-50 scale-in">
          <div className="p-3 border-b border-white/10 flex justify-end items-center">
            {unreadCount > 0 && (
              <button
                className="text-xs text-primary-400 hover:text-primary-300"
                onClick={markAllAsRead}
              >
                Mark all as Read
              </button>
            )}
          </div>
          <div>
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <NotificationItem
                  key={notification._id}
                  notification={notification}
                  onRead={markAsRead}
                  onDelete={deleteNotification}
                />
              ))
            ) : (
              <div className="p-8  text-center text-white/50">
                <BellOff className="max-w-md mx-auto text-2xl mb-2" size={30} />
                <p>No Notifications</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
