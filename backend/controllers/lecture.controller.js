import { v2 as cloudinary } from "cloudinary";

import { Lecture } from "../models/lecture.model.js";
import { Course } from "../models/course.model.js";

import { Purchase } from "../models/purchase.model.js";

export const createLecture = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { title, description, order } = req.body;

    if (!title || !courseId || !order) {
      return res.status(400).json({
        errors: "Title, courseId and order are required",
      });
    }

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        errors: "Course not found",
      });
    }

    if (
      !req.files ||
      !req.files.video ||
      !req.files.notes
    ) {
      return res.status(400).json({
        errors: "Video and PDF notes are required",
      });
    }

    const { video, notes } = req.files;

    const allowedVideoFormats = [
      "video/mp4",
      "video/webm",
      "video/quicktime",
    ];

    if (
      !allowedVideoFormats.includes(
        video.mimetype
      )
    ) {
      return res.status(400).json({
        errors: "Invalid video format",
      });
    }

    const allowedPdfFormats = [
      "application/pdf",
    ];

    if (
      !allowedPdfFormats.includes(
        notes.mimetype
      )
    ) {
      return res.status(400).json({
        errors: "Only PDF notes are allowed",
      });
    }

    const videoUpload =
      await cloudinary.uploader.upload(
        video.tempFilePath,
        {
          resource_type: "video",
          folder: "learnistiq/lectures/videos",
        }
      );

    const notesUpload =
      await cloudinary.uploader.upload(
        notes.tempFilePath,
        {
          resource_type: "raw",
          folder: "learnistiq/lectures/notes",
        }
      );

    const lecture =
      await Lecture.create({
        title,
        description,
        order,
        courseId,

        video: {
          public_id:
            videoUpload.public_id,
          url:
            videoUpload.secure_url,
        },

        notes: {
          public_id:
            notesUpload.public_id,
          url:
            notesUpload.secure_url,
        },
      });

    course.lectures.push(
      lecture._id
    );

    await course.save();

    return res.status(201).json({
      success: true,
      message:
        "Lecture created successfully",
      lecture,
    });
  } catch (error) {
    console.log(
      "Create lecture error:",
      error
    );

    return res.status(500).json({
      errors: "Error creating lecture",
    });
  }
};

export const getCourseLectures =
  async (req, res) => {
    try {
      const { userId } = req;
      const { courseId } =
        req.params;

      const purchase =
        await Purchase.findOne({
          userId,
          courseId,
          status: "success",
        });

      if (!purchase) {
        return res.status(403).json({
          success: false,
          errors:
            "Please purchase this course first",
        });
      }

      const lectures =
        await Lecture.find({
          courseId,
        }).sort({
          order: 1,
        });

      return res.status(200).json({
        success: true,
        lectures,
      });
    } catch (error) {
      console.log(
        "Get lecture error:",
        error
      );

      return res.status(500).json({
        errors:
          "Error fetching lectures",
      });
    }
    };
  
export const deleteLecture =
  async (req, res) => {
    try {
      const { lectureId } =
        req.params;

      const lecture =
        await Lecture.findById(
          lectureId
        );

      if (!lecture) {
        return res.status(404).json({
          errors:
            "Lecture not found",
        });
      }

      await Course.findByIdAndUpdate(
        lecture.courseId,
        {
          $pull: {
            lectures:
              lecture._id,
          },
        }
      );

      await Lecture.findByIdAndDelete(
        lectureId
      );

      return res.status(200).json({
        success: true,
        message:
          "Lecture deleted successfully",
      });
    } catch (error) {
      console.log(
        "Delete lecture error:",
        error
      );

      return res.status(500).json({
        errors:
          "Error deleting lecture",
      });
    }
    };
  
export const getAdminCourseLectures =
  async (req, res) => {
    try {
      const { courseId } =
        req.params;

      const lectures =
        await Lecture.find({
          courseId,
        }).sort({
          order: 1,
        });

      return res.status(200).json({
        success: true,
        lectures,
      });
    } catch (error) {
      console.log(
        "Admin get lectures error:",
        error
      );

      return res.status(500).json({
        errors:
          "Error fetching lectures",
      });
    }
  };