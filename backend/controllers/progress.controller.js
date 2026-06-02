import { Progress } from "../models/progress.model.js";
import { Purchase } from "../models/purchase.model.js";
import { Lecture } from "../models/lecture.model.js";
import crypto from "crypto";
import PDFDocument from "pdfkit";
import { User } from "../models/user.model.js";
import { Course } from "../models/course.model.js";

export const markLectureComplete =
  async (req, res) => {
    try {
      const { userId } = req;

      const {
        courseId,
        lectureId,
      } = req.body;

      const purchase =
        await Purchase.findOne({
          userId,
          courseId,
          status: "success",
        });

      if (!purchase) {
        return res.status(403).json({
          errors:
            "Course not purchased",
        });
      }

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

      let progress =
        await Progress.findOne({
          userId,
          courseId,
        });

      if (!progress) {
        progress =
          await Progress.create({
            userId,
            courseId,
            completedLectures: [],
          });
      }

      const alreadyCompleted =
        progress.completedLectures.some(
          (id) =>
            id.toString() ===
            lectureId
        );

      if (!alreadyCompleted) {
        progress.completedLectures.push(
          lectureId
        );
      }

      progress.lastWatchedLecture =
        lectureId;

      const totalLectures =
        await Lecture.countDocuments({
          courseId,
        });

      progress.progressPercentage =
        Math.round(
          (progress.completedLectures
            .length /
            totalLectures) *
            100
        );

      if (
        progress.progressPercentage >=
        100
      ) {
        progress.progressPercentage =
          100;

        progress.isCourseCompleted =
          true;

        if (
          !progress.completedAt
        ) {
          progress.completedAt =
            new Date();
        }

        if (
          !progress.certificateId
        ) {
          progress.certificateId =
            "LSTQ-" +
            crypto
              .randomBytes(4)
              .toString("hex")
              .toUpperCase();
        }
      }

      await progress.save();

      return res.status(200).json({
        success: true,
        message:
          "Lecture marked complete",
        progress,
      });
    } catch (error) {
      console.log(
        "Mark lecture complete error:",
        error
      );

      return res.status(500).json({
        errors:
          "Error updating progress",
      });
    }
  };

export const getCourseProgress =
  async (req, res) => {
    try {
      const { userId } = req;

      const { courseId } =
        req.params;

      const progress =
        await Progress.findOne({
          userId,
          courseId,
        });

      if (!progress) {
        return res.status(200).json({
          progressPercentage: 0,
          completedLectures: [],
          lastWatchedLecture:
            null,
          isCourseCompleted:
            false,
          completedAt: null,
        });
      }

      return res.status(200).json({
        success: true,
        progress,
      });
    } catch (error) {
      console.log(
        "Get progress error:",
        error
      );

      return res.status(500).json({
        errors:
          "Error fetching progress",
      });
    }
    };
  

export const downloadCertificate =
  async (req, res) => {
    try {
      const { userId } = req;
      const { courseId } =
        req.params;

      const progress =
        await Progress.findOne({
          userId,
          courseId,
        });

      if (
        !progress ||
        !progress.isCourseCompleted
      ) {
        return res.status(403).json({
          errors:
            "Course not completed yet",
        });
      }

      const user =
        await User.findById(
          userId
        );

      const course =
        await Course.findById(
          courseId
        );

      if (
        !user ||
        !course
      ) {
        return res.status(404).json({
          errors:
            "Data not found",
        });
      }

      const studentName =
        `${user.firstName} ${user.lastName}`.trim();

      const completionDate =
        progress.completedAt?.toLocaleDateString(
          "en-IN",
          {
            day: "2-digit",
            month: "long",
            year: "numeric",
          }
        );

      const doc =
        new PDFDocument({
          layout: "landscape",
          size: "A4",
          margin: 40,
        });

      res.setHeader(
        "Content-Type",
        "application/pdf"
      );

      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${course.title}-certificate.pdf"`
      );

      doc.pipe(res);

      const pageWidth =
        doc.page.width;

      const pageHeight =
        doc.page.height;

      // Background

      doc.rect(
        0,
        0,
        pageWidth,
        pageHeight
      )
        .fill("#FFFFFF");

      // Outer Border

      doc
        .lineWidth(5)
        .strokeColor("#493D9E")
        .rect(
          20,
          20,
          pageWidth - 40,
          pageHeight - 40
        )
        .stroke();

      // Inner Border

      doc
        .lineWidth(1.5)
        .strokeColor("#B2A5FF")
        .rect(
          35,
          35,
          pageWidth - 70,
          pageHeight - 70
        )
        .stroke();

      // Header

      doc
        .fillColor("#493D9E")
        .fontSize(34)
        .text(
          "LEARNISTIQ",
          0,
          60,
          {
            align:
              "center",
          }
        );

      doc
        .fillColor("#000000")
        .fontSize(22)
        .text(
          "CERTIFICATE OF COMPLETION",
          {
            align:
              "center",
          }
        );

      // Decorative Line

      doc
        .moveTo(
          pageWidth / 2 - 180,
          140
        )
        .lineTo(
          pageWidth / 2 + 180,
          140
        )
        .strokeColor("#B2A5FF")
        .stroke();

      // Body

      doc
        .fillColor("#555555")
        .fontSize(18)
        .text(
          "This certifies that",
          0,
          180,
          {
            align:
              "center",
          }
        );

      // Student Name

      doc
        .fillColor("#493D9E")
        .fontSize(34)
        .text(
          studentName.toUpperCase(),
          {
            align:
              "center",
          }
        );

      doc
        .fillColor("#444444")
        .fontSize(18)
        .text(
          "has successfully completed the course",
          {
            align:
              "center",
          }
        );

      // Course Name

      doc
        .fillColor("#000000")
        .fontSize(28)
        .text(
          `"${course.title}"`,
          {
            align:
              "center",
          }
        );

      // Instructor

      doc.moveDown(1.5);

      doc
        .fontSize(16)
        .fillColor("#222222")
        .text(
          `Instructor: ${course.instructor}`,
          {
            align:
              "center",
          }
        );

      // Date

      doc.text(
        `Completion Date: ${completionDate}`,
        {
          align:
            "center",
        }
      );

      // Certificate ID Box

      const boxWidth = 320;
      const boxHeight = 50;
      const boxX =
        pageWidth / 2 -
        boxWidth / 2;

      doc
        .roundedRect(
          boxX,
          435,
          boxWidth,
          boxHeight,
          8
        )
        .fillAndStroke(
          "#DAD2FF",
          "#B2A5FF"
        );

      doc
        .fillColor("#000000")
        .fontSize(14)
        .text(
          `Certificate ID: ${progress.certificateId}`,
          boxX,
          452,
          {
            width:
              boxWidth,
            align:
              "center",
          }
        );

      // Signature Lines

      doc
        .moveTo(
          120,
          525
        )
        .lineTo(
          280,
          525
        )
        .strokeColor(
          "#000000"
        )
        .stroke();

      doc
        .moveTo(
          pageWidth - 280,
          525
        )
        .lineTo(
          pageWidth - 120,
          525
        )
        .stroke();

      doc
        .fillColor("#000000")
        .fontSize(14)
        .text(
          "Learnistiq",
          160,
          535
        );

      doc.text(
        course.instructor,
        pageWidth - 235,
        535
      );

      // Footer

      doc
        .fillColor("#666666")
        .fontSize(12)
        .text(
          "Official Certificate Issued by Learnistiq",
          0,
          590,
          {
            align:
              "center",
          }
        );

      doc.end();
    } catch (error) {
      console.log(
        "Certificate error:",
        error
      );

      return res.status(500).json({
        errors:
          "Error generating certificate",
      });
    }
    };
  
    export const verifyCertificate =
  async (req, res) => {
    try {
      const {
        certificateId,
      } = req.params;

      const progress =
        await Progress.findOne({
          certificateId,
          isCourseCompleted: true,
        })
          .populate(
            "userId",
            "firstName lastName email"
          )
          .populate(
            "courseId",
            "title instructor"
          );

      if (!progress) {
        return res.status(404).json({
          success: false,
          message:
            "Certificate not found",
        });
      }

      return res.status(200).json({
        success: true,

        certificate: {
          certificateId:
            progress.certificateId,

          studentName: `${progress.userId.firstName} ${progress.userId.lastName}`,

          email:
            progress.userId.email,

          courseTitle:
            progress.courseId.title,

          instructor:
            progress.courseId.instructor,

          completedAt:
            progress.completedAt,
        },
      });
    } catch (error) {
      console.log(
        "Certificate verification error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Error verifying certificate",
      });
    }
  };