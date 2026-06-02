import mongoose from "mongoose";

const certificateSchema =
  new mongoose.Schema(
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
      },

      certificateNumber: {
        type: String,
        required: true,
        unique: true,
      },

      issuedAt: {
        type: Date,
        default: Date.now,
      },
    },
    {
      timestamps: true,
    }
  );

export const Certificate =
  mongoose.model(
    "Certificate",
    certificateSchema
  );