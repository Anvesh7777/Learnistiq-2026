import express from "express";
import userMiddleware from "../Middlewares/user.mid.js";

import {
  getCertificate,
  downloadCertificate,
} from "../controllers/certificate.controller.js";

import {
  verifyCertificate,
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

router.get(
  "/verify/:certificateId",
  verifyCertificate
);

export default router;