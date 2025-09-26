// Notification Context for global notifications system
"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { NotificationInput, NotificationPayload } from "../types/notification";
import { useAuth } from "./AuthContext";
import { api } from "../utils/api";
import { AxiosError } from "axios";

interface NotificationContextType {
  notifications: NotificationPayload[];
  unreadCount: number;
  isLoading: boolean;
  markAsRead: (nft: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (nft: string) => void;
  addNotification: (notifcation: NotificationInput) => void;
  toast: (
    type: "info" | "success" | "error" | "warning",
    action: "bid" | "sale" | "like" | "follow" | "system",
    title: string,
    message: string,
    duration: number
  ) => void;
}

const NotificationContext = createContext<NotificationContextType | null>(null);

export default function NotificationProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<NotificationPayload[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      if (user)
        try {
          const res = await api.get("/notifications");

          if (!res.data.data) {
            setNotifications([]);
            return;
          }

          setNotifications(res.data.data);
        } catch (error) {
          console.error("Failed to fetch notifications", error);
        } finally {
          setIsLoading(false);
        }
    };

    fetchNotifications();
  }, [user]);

  // Count unread notifications
  const unreadCount = useMemo(() => {
    return notifications.filter((n) => !n.isRead).length;
  }, [notifications]);

  const markAsRead = async (notificationId: string) => {
    try {
      setNotifications((prev) =>
        prev.map((notification) =>
          notification._id === notificationId
            ? { ...notification, isRead: true }
            : notification
        )
      );

      await api.patch("/notifications", {
        _id: notificationId,
        isRead: true,
      });
    } catch (error) {
      console.log("something went wrong", error);
      setNotifications((prev) =>
        prev.map((notification) =>
          notification._id === notificationId
            ? { ...notification, isRead: false }
            : notification
        )
      );
    }
  };

  // Mark all notifications as read
  const markAllAsRead = async () => {
    try {
      await api.get("/notifications/markAllRead");
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    } catch (error) {
      console.error("Failed to mark all as read:", error);
    }
  };

  // Delete a notification
  const deleteNotification = async (notificationId: string) => {
    const notification = notifications.find(
      (item) => item._id === notificationId
    );

    try {
      setNotifications((prev) =>
        prev.filter((notification) => notification._id !== notificationId)
      );

      await api.delete(`/notifications?_id=${notificationId}`);
    } catch (error) {
      console.log("something went wrong", error);
      if (notification) setNotifications((prev) => [notification, ...prev]);
    }
  };

  // Add a new notification
  const addNotification = async (notification: NotificationInput) => {
    if (notification.isToast) {
      setNotifications((prev) => [
        {
          ...(notification as NotificationPayload),
          _id: Date.now().toString(),
        },
        ...prev,
      ]);
      return;
    }
    try {
      const res = await api.post("/notifications", notification);

      if (res.data) {
        setNotifications((prev) => [res.data.data, ...prev]);
        return;
      }
    } catch (err) {
      const error =
        err instanceof AxiosError
          ? err.response?.data.message
          : "Something went wrong";
      toast("error", "bid", "Error!", error, 7000);
    }
  };

  const toast = (
    type: "info" | "success" | "error" | "warning",
    action: "bid" | "sale" | "like" | "follow" | "system",
    title: string,
    message: string,
    duration = 5000
  ) => {
    const toastId = String(Date.now());

    // Add notification
    addNotification({
      action,
      type,
      title,
      message,
      isRead: false,
      isToast: true,
      recipient: user?._id ?? "",
    });

    // Auto-remove after duration
    setTimeout(() => {
      setNotifications((prev) =>
        prev.filter((notification) => notification._id !== toastId)
      );
    }, duration);

    return toastId;
  };

  // Context value
  const value: NotificationContextType = {
    notifications,
    unreadCount,
    isLoading,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    addNotification,
    toast,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

// Hook for using the notification context
export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === null) {
    throw new Error(
      "useNotifications must be used within a NotificationProvider"
    );
  }
  return context;
}
