import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import urlRoutes from "./routes/url.routes.js";
import { redirectUrl } from "./controllers/url.controller.js";
import analyticsRoutes from "./routes/analytics.routes.js";
import redis from "./config/redis.js";

const app = express();

app.use(
  cors({
    origin: "https://shortify-url-shrt.vercel.app",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("API Running...");
});

app.use("/api/auth", authRoutes);
app.use("/api/urls", urlRoutes);

app.use("/api/analytics", analyticsRoutes);

app.get("/test-redis", async (req, res) => {
  console.log("Test Redis route hit");

  try {
    await redis.set("test", "ok");
    const value = await redis.get("test");
    res.send(value || "No value");
  } catch (error) {
    console.error("Redis error:", err);
    res.status(500).send("Redis failed");
  }
});

app.get("/:code", redirectUrl);

export default app;
