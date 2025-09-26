import mongoose, { Schema } from "mongoose";
const UserSchema = new Schema(
  {
    login_type: {
      type: String,
      enum: ["custom", "google", "wallet"],
      required: true,
    },
    google_id: { type: String, unique: true, sparse: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    owner_id: { type: String, unique: true, sparse: true },
    role: { type: String, required: true },
    avatar: {
      type: String,
      default: "/pfp.png",
    },
    password: { type: String },
    walletBalance: { type: Number, default: 0 },
    username: { type: String, unique: true },
    isVerified: { type: Boolean, default: false },
    refresh_token: { type: String, default: "" },
    location: { type: String, default: "", select: true },
    email_verified: { type: Boolean, default: false },
    userType: { type: String, default: "Collector" }, // fun or meaningful default
    badges: {
      type: [String],
      default: ["🎉 Welcome Aboard!"], // Initial badge
    },
    experienceLevel: { type: String, default: "Beginner" },
    availability: { type: String, default: "Occasionally active" },
    tags: {
      type: [String],
      default: ["newbie", "curious", "just joined"],
    },
    tradingStyle: { type: String, default: "Exploring" },
    preferredBlockchain: { type: String, default: "Ethereum" },
    nftsOwned: { type: Number, default: 0 },
    nftsSold: { type: Number, default: 0 },
    totalVolume: { type: Number, default: 0 },
    favoriteCategories: {
      type: [String],
      default: ["Art", "Collectibles"], // just to make profile look filled
    },
    socialMedia: {
      twitter: { type: String, default: "" },
      discord: { type: String, default: "" },
      instagram: { type: String, default: "" },
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.models.User || mongoose.model("User", UserSchema);
