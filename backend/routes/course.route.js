import express from "express";
import { createCourse } from "../controllers/course.controller.js";
import { updateCourse } from "../controllers/course.controller.js";
import { deleteCourse } from "../controllers/course.controller.js";
import { getCourses } from "../controllers/course.controller.js";
import { buyCourses } from "../controllers/course.controller.js";
import userMiddleware from "../Middlewares/user.mid.js";
import adminMiddleware from "../Middlewares/admin.mid.js";
import { getCourseById } from "../controllers/course.controller.js";


import {
  addReview,
  getCourseReviews,
    deleteReview,
  searchCourses,
} from "../controllers/course.controller.js";

const router = express.Router();

router.post("/create",adminMiddleware, createCourse);
router.put("/update/:courseId",adminMiddleware, updateCourse);
router.delete("/delete/:courseId",adminMiddleware, deleteCourse);
router.get("/courses", getCourses); 
router.post("/buy/:courseId", userMiddleware, buyCourses);
router.get("/public/:courseId", getCourseById);
router.post(
  "/review/:courseId",
  userMiddleware,
  addReview
);
router.delete(
  "/review/:reviewId",
  userMiddleware,
  deleteReview
);

router.get(
  "/reviews/:courseId",
  getCourseReviews
); 

router.get(
  "/search",
  searchCourses
);


export default router;





