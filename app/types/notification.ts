import { CollectionPayload } from "./collection";
import { NftPayload } from "./nftTypes";
import { User } from "./user";

export type NotificationPayload = {
  _id: string;
  type: "info" | "success" | "error" | "warning";
  action: "bid" | "sale" | "like" | "follow" | "system";
  title: string;
  message: string;
  isRead?: boolean;
  isToast?: boolean;
  createdAt: string;
  updatedAt: string;
  recipient: string;
  data?: NftPayload | CollectionPayload | User;
};

export type NotificationInput = {
  type: NotificationPayload["type"];
  action: NotificationPayload["action"];
  title: string;
  message: string;
  recipient: string;
  isToast?: boolean;
  isRead?: boolean;
  data?: string;
};

export type toastProps = {
  message: string;
  type: "info" | "success" | "error" | "warning";
  title: string;
  duration?: number;
  onClose: () => void;
  showProgress?: boolean;
  position:
    | "top-right"
    | "top-left"
    | "bottom-right"
    | "bottom-left"
    | "top-center"
    | "bottom-center";
};
