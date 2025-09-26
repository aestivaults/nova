import mongoose, { Schema } from "mongoose";

const TransactionSchema = new Schema(
  {
    type: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "failed"],
      default: "pending",
    },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    note: { type: String, required: true },
    amount: { type: Number, required: true },

    toAddress: {
      type: String,
      required: true,
    },
    fee: { type: Number, default: 0.002 },
    network: { type: String, default: "Ethereum" },
    txHash: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

TransactionSchema.index({ user: 1, createdAt: -1 });

export const Transaction =
  mongoose.models.Transaction ||
  mongoose.model("Transaction", TransactionSchema);
