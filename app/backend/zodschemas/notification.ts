import { z } from "zod";

export const NotificationSchema = z.object({
  type: z.enum(["info", "success", "error", "warning"]),
  action: z.enum(["bid", "sale", "like", "follow", "system"]),
  title: z.string(),
  message: z.string(),
  recipient: z.string(), // could be a user ID
  isToast: z.boolean().optional(),
  isRead: z.boolean().optional(),
  data: z.string().optional(),
});

export const NotificationUpdateSchema = z.object({
  _id: z.string(),
  isRead: z.boolean(),
});
