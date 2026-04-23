import express from "express";
import {
  login,
  signup,
  refreshToken,
  logout,
} from "../controllers/auth.controller.js";
import { rateLimiter } from "../middlewares/rateLimiter.js";

const router = express.Router();

router.post("/signup", rateLimiter, signup);
router.post("/login", rateLimiter, login);
router.post("/refresh", refreshToken);
router.post("/logout", logout);

export default router;
