import { createClient } from "redis";

const redisClient = createClient()
  .on("connect", () => {
    console.log("Redis is connected");
  })
  .on("error", () => {
    console.log("Failed to connect with redis.");
    process.exit(1);
  })
  .connect();

export default redisClient
