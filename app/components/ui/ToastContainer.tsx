"use client";
import { NotificationPayload } from "@/app/types/notification";
import { Toast } from "./Toast";
import { useMemo } from "react";
import { useNotifications } from "@/app/context/NotificationProvider";

export function ToastContainer({
  position = "top-right",
}: {
  position?:
    | "top-right"
    | "top-left"
    | "bottom-right"
    | "bottom-left"
    | "top-center"
    | "bottom-center";
}) {
  const { notifications } = useNotifications();

  // Filter only toast notifications
  const toasts = useMemo(() => {
    return notifications.filter((n) => n.isToast) as Omit<
      NotificationPayload[],
      "type"
    > & { type: string };
  }, [notifications]);

  return (
    <>
      {toasts.map((toast) => (
        <Toast
          key={toast._id}
          type={toast.type as "info" | "success" | "error" | "warning"}
          title={toast.title}
          message={toast.message}
          position={position}
          onClose={() => {}}
        />
      ))}
    </>
  );
}
