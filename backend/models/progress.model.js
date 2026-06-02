import mongoose from "mongoose";

const progressSchema = new mongoose.Schema(
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
   

    completedLectures: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lecture",
      },
    ],

    lastWatchedLecture: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lecture",
      default: null,
    },

    progressPercentage: {
      type: Number,
      default: 0,
        },
    isCourseCompleted: {
  type: Boolean,
  default: false,
},
completedAt: {
  type: Date,
  default: null,
},certificateId: {
  type: String,
  default: null,
}
  },
  {
    timestamps: true,
  }
);

progressSchema.index(
  {
    userId: 1,
    courseId: 1,
  },
  {
    unique: true,
  }
);

export const Progress = mongoose.model(
  "Progress",
  progressSchema
);