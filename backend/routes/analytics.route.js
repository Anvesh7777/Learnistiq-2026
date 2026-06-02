import express from "express";

import adminMiddleware from "../Middlewares/admin.mid.js";

import {
  getAnalytics,
} from "../controllers/analytics.controller.js";

const router = express.Router();

router.get(
  "/",
  adminMiddleware,
  getAnalytics
);

export default router;