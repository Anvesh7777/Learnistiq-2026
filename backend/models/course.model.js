import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    instructor: {
      type: String,
      required: true,
      trim: true,
    },

    image: {
      public_id: {
        type: String,
        required: true,
      },

      url: {
        type: String,
        required: true,
      },
    },

    creatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    lectures: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lecture",
      },
        ],
    
        averageRating: {
  type: Number,
  default: 0,
},

totalRatings: {
  type: Number,
  default: 0,
},
  },
  {
    timestamps: true,
  }
);

export const Course = mongoose.model(
  "Course",
  courseSchema
);