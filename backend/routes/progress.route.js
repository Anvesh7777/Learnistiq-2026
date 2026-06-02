import express from "express";

import {
  markLectureComplete,
    getCourseProgress,
    downloadCertificate,
    verifyCertificate
} from "../controllers/progress.controller.js";

import userMiddleware from "../Middlewares/user.mid.js";

const router = express.Router();

router.post(
  "/complete",
  userMiddleware,
  markLectureComplete
);

router.get(
  "/course/:courseId",
  userMiddleware,
  getCourseProgress
);

router.get(
  "/certificate/:courseId",
  userMiddleware,
  downloadCertificate
);

router.get(
  "/verify/:certificateId",
  verifyCertificate
);

export default router;