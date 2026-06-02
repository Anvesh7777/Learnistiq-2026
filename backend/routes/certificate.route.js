import express from "express";
import userMiddleware from "../Middlewares/user.mid.js";

import {
  getCertificate,
  downloadCertificate,
} from "../controllers/certificate.controller.js";

const router = express.Router();

router.get(
  "/:courseId",
  userMiddleware,
  getCertificate
);

router.get(
  "/download/:courseId",
  userMiddleware,
  downloadCertificate
);

export default router;