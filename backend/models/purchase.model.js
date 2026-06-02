import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },

    courseId: {
      type: mongoose.Types.ObjectId,
      ref: "Course",
      required: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    paymentId: {
      type: String,
      default: null,
    },

    orderId: {
      type: String,
      default: null,
    },

    signature: {
      type: String,
      default: null,
    },

    verified: {
      type: Boolean,
      default: true,
    },

    fallback: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      enum: ["success", "pending", "failed"],
      default: "success",
    },
  },
  {
    timestamps: true,
  }
);

export const Purchase = mongoose.model(
  "Purchase",
  purchaseSchema
);