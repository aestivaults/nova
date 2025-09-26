import mongoose, { Schema } from "mongoose";

const NftSchema = new Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    token_id: { type: String, required: true, unique: true },
    current_bid: { type: Number, default: 0 },
    auctionEndTime: { type: String },
    type: {
      type: String,
      enum: ["auction", "sale"],
      lowercase: true,
      required: true,
    },
    media_url: { type: String, required: true },
    media_type: { type: String, enum: ["image", "video"], required: true },
    creator: { type: Schema.Types.ObjectId, ref: "User", required: true },
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    metadata: {
      contract: String,
      blockchain: String,
      tokenStandard: String,
    },
    bids: [{ type: Schema.Types.ObjectId, ref: "Bid", required: false }],
    owning_collection: {
      type: Schema.Types.ObjectId,
      ref: "Collection",
      required: true,
    },
    likes_count: { type: Number, default: 0 },
    description: { type: String },
  },
  { timestamps: true }
);

export const NFT = mongoose.models.Nft || mongoose.model("Nft", NftSchema);
