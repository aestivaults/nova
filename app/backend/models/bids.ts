import mongoose, { Schema } from "mongoose";

const BidSchema = new Schema(
  {
    nft: { type: Schema.Types.ObjectId, ref: "Nft", required: true },
    bidder: { type: Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    time: { type: Date, default: Date.now },
    status: { type: String, default: "active" },
  },
  { timestamps: true }
);

export const Bid = mongoose.models.Bid || mongoose.model("Bid", BidSchema);
