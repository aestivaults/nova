"use client";
import { useNotifications } from "@/app/context/NotificationProvider";
import Link from "next/link";
import { useEffect, useState } from "react";
import NotificationItem from "./NotificationItem";
import { Bell, BellOff } from "lucide-react";

export default function NotificationCenter() {
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
  } = useNotifications();
  const [isOpen, setIsOpen] = useState(false);

  // Toggle dropdown
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;

      if (!target) return;

      if (isOpen && !target.closest(".notification-center")) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="notification-center relative">
      <button
        className="notification-badge relative p-2"
        onClick={toggleDropdown}
        aria-label="Notifications"
      >
        <Bell />
        {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 max-h-[500px] overflow-y-auto bg-dark shadow-lg rounded-lg z-50 scale-in">
          <div className="p-3 border-b border-white/10 flex justify-between items-center">
            <h3 className="font-medium">Notifications</h3>

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
              <div className="p-4 text-center text-white/50">
                <BellOff className="max-w-md mx-auto text-2xl mb-2" />
                <p>Notifications</p>
              </div>
            )}
          </div>

          <div className="p-3 border-t border-white/10 text-center">
            <Link
              href="/dashboard/notifications"
              className="text-sm text-primary-400 hover:text-primary-300"
              onClick={() => setIsOpen(false)}
            >
              View All
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
