import Click from "../models/click.model.js";

export const processAnalytics = (code, req) => {
  setImmediate(async () => {
    try {
      await Click.create({
        shortCode: code,
        userAgent: req.headers["user-agent"] || "unknown",
        referrer: req.headers.referer || "direct",
      });
    } catch (err) {
      console.log("Analytics error:", err.message);
    }
  });
};
