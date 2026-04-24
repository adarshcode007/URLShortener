import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import urlRoutes from "./routes/url.routes.js";
import { redirectUrl } from "./controllers/url.controller.js";
import analyticsRoutes from "./routes/analytics.routes.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
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

app.get("/:code", redirectUrl);

app.use("/api/analytics", analyticsRoutes);

export default app;
