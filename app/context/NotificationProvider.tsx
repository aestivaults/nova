// Notification Context for global notifications system
"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, ReactNode, useContext, useMemo } from "react";
import { NotificationInput, NotificationPayload } from "../types/notification";
import { api } from "../utils/api";
import { useAuth } from "./AuthContext";

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
  const queryClient = useQueryClient();

  const { data: notifications = [], isLoading } = useQuery<
    NotificationPayload[],
    Error
  >({
    queryKey: ["notifications", user?._id], // ← unique per user
    queryFn: () => getNotifications(), // ← fetch all for user
    enabled: !!user, // ← ONLY run when user exists
    staleTime: 1000 * 60, // 1 min
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });

  // Count unread notifications
  const unreadCount = useMemo(() => {
    return notifications.filter((n) => !n.isRead).length;
  }, [notifications]);

  const markAsRead = async (notificationId: string) => {
    try {
      queryClient.setQueryData<NotificationPayload[]>(
        ["notifications", user?._id],
        (old = []) =>
          old.map((n) =>
            n._id === notificationId ? { ...n, isRead: true } : n
          )
      );

      await api.patch("/notifications", {
        _id: notificationId,
        isRead: true,
      });
    } catch (error) {
      console.log("something went wrong", error);
      queryClient.invalidateQueries({
        queryKey: ["notifications", user?._id],
      });
    }
  };

  // Mark all notifications as read
  const markAllAsRead = async () => {
    try {
      await api.get("/notifications/markAllRead");
      queryClient.setQueryData<NotificationPayload[]>(
        ["notifications", user?._id],
        (old = []) => old.map((n) => ({ ...n, isRead: true }))
      );
    } catch (error) {
      console.error("Failed to mark all as read:", error);
    }
  };

  // Delete a notification
  const deleteNotification = async (notificationId: string) => {
    try {
      queryClient.setQueryData<NotificationPayload[]>(
        ["notifications", user?._id],
        (old = []) =>
          old.filter((n) =>
            n._id !== notificationId ? { ...n, isRead: true } : n
          )
      );

      await api.delete(`/notifications?_id=${notificationId}`);
    } catch (error) {
      console.log("something went wrong", error);
      queryClient.invalidateQueries({
        queryKey: ["notifications", user?._id],
      });
    }
  };

  // Add a new notification
  const addNotification = async (input: NotificationInput) => {
    if (input.isToast) {
      // Local toast
      queryClient.setQueryData<NotificationPayload[]>(
        ["notifications", user?._id],
        (old) => [
          {
            ...(input as NotificationPayload),
            _id: Date.now().toString(),
          },
          ...(old ?? []),
        ]
      );
      return;
    }

    try {
      const res = await api.post("/notifications", input);
      queryClient.setQueryData<NotificationPayload[]>(
        ["notifications", user?._id],
        (old) => [res.data.data, ...(old ?? [])]
      );
    } catch (err) {
      toast(
        "error",
        "system",
        "Error",
        err instanceof Error ? err.message : "something went wrong",
        7000
      );
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
      queryClient.setQueryData<NotificationPayload[]>(
        ["notifications", user?._id],
        (old) => old?.filter((n) => n._id !== toastId) ?? []
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

async function getNotifications() {
  const { data } = await api.get("/notifications");

  return data.data;
}
