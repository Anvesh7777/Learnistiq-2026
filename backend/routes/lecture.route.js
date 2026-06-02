import express from "express";

import {
  createLecture,
  getCourseLectures,
    deleteLecture,
    getAdminCourseLectures,
  
} from "../controllers/lecture.controller.js";

import adminMiddleware from "../Middlewares/admin.mid.js";
import userMiddleware from "../Middlewares/user.mid.js";

const router = express.Router();

router.post(
  "/create/:courseId",
  adminMiddleware,
  createLecture
);

router.get(
  "/course/:courseId",
  userMiddleware,
  getCourseLectures
);

router.delete(
  "/delete/:lectureId",
  adminMiddleware,
  deleteLecture
);

router.get(
  "/admin/course/:courseId",
  adminMiddleware,
  getAdminCourseLectures
);

export default router;