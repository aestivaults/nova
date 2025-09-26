import mongoose, { Schema } from "mongoose";

const CollectionSchema = new Schema({
  name: String,
  description: String,
  created_at: { type: Date, default: Date.now },
  banner_image: String,
  logo_image: String,
  category: { type: String, required: true },
  featured: { type: Boolean, default: false },
  royalties: { type: Number },

  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  nfts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Nft" }],
  owners: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

  floor_price: Number,
  total_volume: Number,
});

export const Collection =
  mongoose.models.Collection || mongoose.model("Collection", CollectionSchema);
