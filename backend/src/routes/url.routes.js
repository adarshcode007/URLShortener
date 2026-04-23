import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import {
  createUrl,
  getUserUrls,
  redirectUrl,
} from "../controllers/url.controller.js";
import { rateLimiter } from "../middlewares/rateLimiter.js";

const router = express.Router();

router.post("/", protect, rateLimiter, createUrl);
router.get("/", protect, getUserUrls);

router.get("/:code", rateLimiter, redirectUrl);

export default router;
