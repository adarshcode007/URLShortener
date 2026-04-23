import Redis from "ioredis";

let redis;

try {
  redis = new Redis({
    host: "127.0.0.1",
    port: 6379,
  });

  redis.on("connect", () => console.log("Redis Connected"));
  redis.on("error", (err) => console.log("Redis Error: ", err.message));
} catch (err) {
  console.log("Redis not available");
}

export default redis;
