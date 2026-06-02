import express from 'express';
import { checkout } from '../controllers/payment.controller.js';
import { verifyPayment } from '../controllers/payment.controller.js';
import { fallbackPurchase } from '../controllers/payment.controller.js';

const router = express.Router();

import userMiddleware from "../Middlewares/user.mid.js";

router.post(
  "/checkout",
  userMiddleware,
  checkout
);

router.post(
  "/verify",
  userMiddleware,
  verifyPayment
);
router.post("/purchase/fallback", fallbackPurchase);


export default router;



