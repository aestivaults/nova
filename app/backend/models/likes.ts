// models/Like.ts
import mongoose, { Schema } from "mongoose";

const LikeSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    itemId: { type: Schema.Types.ObjectId, required: true },
    itemType: {
      type: String,
      enum: ["NFT", "Collection", "Other"],
      required: true,
    },
  },
  { timestamps: true }
);

LikeSchema.index({ user: 1, itemId: 1, itemType: 1 }, { unique: true });

export const Like = mongoose.models.Like || mongoose.model("Like", LikeSchema);
