import express from "express";

import {
  signup,
  login,
  logout,
  getUserPurchases,
  getMyCourses,
  forgotPassword,
  resetPassword,
} from "../controllers/user.controller.js";

import userMiddleware from "../Middlewares/user.mid.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.get("/logout", logout);

router.get(
  "/purchases",
  userMiddleware,
  getUserPurchases
);

router.get(
  "/my-courses",
  userMiddleware,
  getMyCourses
);

router.post(
  "/forgot-password",
  forgotPassword
);

router.post(
  "/reset-password/:token",
  resetPassword
);

export default router;