import { Job, Worker } from "bullmq";
import IoRedis from "ioredis";

const redisConnection = new IoRedis({ maxRetriesPerRequest: null });

const sendEmail = async (job:Job) => {
    console.log(job.data)
}

new Worker("messageQ",sendEmail,{connection:redisConnection})