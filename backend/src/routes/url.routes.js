import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import {
  createUrl,
  getUserUrls,
  redirectUrl,
} from "../controllers/url.controller.js";

const router = express.Router();

router.post("/", protect, createUrl);
router.get("/", protect, getUserUrls);

router.get("/:code", redirectUrl);

export default router;
