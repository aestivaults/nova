// models/Follow.ts
import { Schema, model, models } from "mongoose";

const FollowSchema = new Schema(
  {
    follower: { type: Schema.Types.ObjectId, ref: "User", required: true },
    following: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

FollowSchema.index({ follower: 1, following: 1 }, { unique: true });

export const Follow = models.Follow || model("Follow", FollowSchema);
