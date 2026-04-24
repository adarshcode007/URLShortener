import Redis from "ioredis";
import dotenv from "dotenv";
dotenv.config();

let redis;

if (!process.env.REDIS_URL) {
  console.log("No REDIS_URL provided");
} else {
  redis = new Redis(process.env.REDIS_URL, {
    tls: {},
  });

  redis.on("connect", () => console.log("Redis Connected"));
  redis.on("error", (err) => console.log("Redis Error: ", err.message));
}

export default redis;
