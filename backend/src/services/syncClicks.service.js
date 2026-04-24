import redis from "../config/redis.js";
import Url from "../models/url.model.js";
import cron from "node-cron";

const syncClicksToDB = async () => {
  try {
    console.log("Running click sync job...");

    const keys = await redis.keys("clicks:*");

    for (let key of keys) {
      const code = key.split(":")[1];
      const count = await redis.get(key);

      if (count && Number(count) > 0) {
        await Url.updateOne(
          { shortCode: code },
          { $inc: { clicks: Number(count) } },
        );
        await redis.del(key);
      }
    }

    console.log("Click sync completed");
  } catch (err) {
    console.error("Sync job error:", err);
  }
};

export const startClickSyncJob = () => {
  cron.schedule("*/5 * * * *", syncClicksToDB);
};
