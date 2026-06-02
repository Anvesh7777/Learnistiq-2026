import PDFDocument from "pdfkit";

import { Certificate } from "../models/certificate.model.js";
import { Progress } from "../models/progress.model.js";
import { User } from "../models/user.model.js";
import { Course } from "../models/course.model.js";

export const getCertificate = async (
  req,
  res
) => {
  try {
    const { userId } = req;
    const { courseId } = req.params;

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
        success: false,
        message:
          "Course not completed yet",
      });
    }

    let certificate =
      await Certificate.findOne({
        userId,
        courseId,
      });

    if (!certificate) {
      certificate =
        await Certificate.create({
          userId,
          courseId,
          certificateNumber: `CERT-${Date.now()}`,
        });
    }

    const user =
      await User.findById(userId);

    const course =
      await Course.findById(courseId);

    return res.status(200).json({
      success: true,
      certificate: {
        certificateNumber:
          certificate.certificateNumber,
        studentName:
          `${user.firstName} ${user.lastName}`,
        courseName:
          course.title,
        issuedAt:
          certificate.issuedAt,
      },
    });
  } catch (error) {
    console.log(
      "Certificate error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Error generating certificate",
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
          success: false,
          message:
            "Course not completed yet",
        });
      }

      let certificate =
        await Certificate.findOne({
          userId,
          courseId,
        });

      if (!certificate) {
        certificate =
          await Certificate.create({
            userId,
            courseId,
            certificateNumber: `CERT-${Date.now()}`,
          });
      }

      const user =
        await User.findById(userId);

      const course =
        await Course.findById(courseId);

      const doc =
        new PDFDocument({
          size: "A4",
          margin: 50,
        });

      res.setHeader(
        "Content-Type",
        "application/pdf"
      );

      res.setHeader(
        "Content-Disposition",
        `attachment; filename=certificate-${courseId}.pdf`
      );

      doc.pipe(res);

      doc
        .fontSize(28)
        .text(
          "CERTIFICATE OF COMPLETION",
          {
            align: "center",
          }
        );

      doc.moveDown(2);

      doc
        .fontSize(18)
        .text(
          "This is to certify that",
          {
            align: "center",
          }
        );

      doc.moveDown();

      doc
        .fontSize(24)
        .text(
          `${user.firstName} ${user.lastName}`,
          {
            align: "center",
          }
        );

      doc.moveDown();

      doc
        .fontSize(18)
        .text(
          "has successfully completed",
          {
            align: "center",
          }
        );

      doc.moveDown();

      doc
        .fontSize(22)
        .text(course.title, {
          align: "center",
        });

      doc.moveDown(2);

      doc
        .fontSize(12)
        .text(
          `Certificate No: ${certificate.certificateNumber}`,
          {
            align: "center",
          }
        );

      doc.text(
        `Issued On: ${new Date(
          certificate.issuedAt
        ).toDateString()}`,
        {
          align: "center",
        }
        );
        
        const verificationUrl =
  `${process.env.FRONTEND_URL}/verify/${progress.certificateId}`;

doc
  .fillColor("#493D9E")
  .fontSize(10)
  .text(
    `Verify Certificate: ${verificationUrl}`,
    0,
    610,
    {
      align: "center",
    }
  );

      doc.end();
    } catch (error) {
      console.log(
        "Download certificate error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Error downloading certificate",
      });
    }
  };