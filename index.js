import { createClient } from "redis";

createClient()
  .on("connect", () => {
    console.log("redis connected");
  })
  .on("error", (err) => {
    console.log("failed to connect with redis");
  })
  .connect();
