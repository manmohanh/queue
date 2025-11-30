import { createClient } from "redis";

createClient()
  .on("connect", () => {
    console.log("redis connected");
  })
  .on("error", (err) => {
    console.log("failed to connect with redis");
  })
  .connect();

import ioRedis from "ioredis"
import express from "express";
import { faker } from "@faker-js/faker";
import { Queue, Worker } from "bullmq";

const app = express();
const redisConnection = new ioRedis({maxRetriesPerRequest:null})
app.listen(8080);

app.post("/message", async (req, res) => {
  try {
    const payload = {
      email: faker.internet.email(),
      message: faker.lorem.paragraph(),
    };
    const messageQ = new Queue("messageQ");
    await messageQ.add("sendMessage", payload);
    res.json({ message: "Task added to queue" });
  } catch (error) {
    res.status(500).json({ error });
  }
});

// const sendMessage = (job:any) => {
//   console.log(job.data);
// };

// new Worker("messageQ", sendMessage,{connection:redisConnection});
