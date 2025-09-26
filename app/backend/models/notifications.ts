// models/notification.ts
import mongoose, { Schema } from "mongoose";

const NotificationSchema = new Schema(
  {
    type: {
      type: String,
      enum: ["info", "success", "error", "warning"],
      required: true,
    },
    action: {
      type: String,
      enum: ["bid", "sale", "like", "follow", "system"],
      required: true,
    },
    title: { type: String, required: true },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
    isToast: { type: Boolean, default: false },

    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    data: {
      refType: {
        type: String,
        enum: ["Nft", "User", "Collection"],
      },
      refId: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: "data.refType",
      },
    },
  },
  {
    timestamps: true,
  }
);

export const Notification =
  mongoose.models.Notification ||
  mongoose.model("Notification", NotificationSchema);
