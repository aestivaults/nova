import mongoose, { Schema } from "mongoose";

const verificationCodeSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    type: {
      type: String,
      required: true,
      enum: ["email-verification", "password-reset", "login", "email-reset"],
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

export const VerificationCode =
  mongoose.models.VerificationCode ||
  mongoose.model("VerificationCode", verificationCodeSchema);
