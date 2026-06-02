import mongoose from "mongoose";

const lectureSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    video: {
      public_id: {
        type: String,
        required: true,
      },

      url: {
        type: String,
        required: true,
      },
    },

    notes: {
      public_id: {
        type: String,
        required: true,
      },

      url: {
        type: String,
        required: true,
      },
    },

    duration: {
      type: Number,
      default: 0,
    },

    order: {
      type: Number,
      required: true,
    },

    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

lectureSchema.index(
  {
    courseId: 1,
    order: 1
  },
  {
    unique: true
  }
);

export const Lecture = mongoose.model(
  "Lecture",
  lectureSchema
);