import express from "express";
import {
  login,
  signup,
  refreshToken,
  logout,
  checkAuth,
} from "../controllers/auth.controller.js";
import { rateLimiter } from "../middlewares/rateLimiter.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/signup", rateLimiter, signup);
router.post("/login", rateLimiter, login);
router.post("/refresh", refreshToken);
router.post("/logout", logout);

router.get("/me", protect, checkAuth);

export default router;
