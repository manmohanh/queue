import dotenv from "dotenv";
dotenv.config();
const Env = process.env;

import mongoose from "mongoose";
mongoose
  .connect(Env.MONGODB_URL!)
  .then(() => console.log("Database connected"))
  .catch((error) => {
    console.log(error);
  });

import express from "express";
import morgan from "morgan";
import "./util/redis.util";
import "./util/workers.util"
import cors from "cors";

import  messageRouter from "./message/message.router"

const app = express();
app.listen(Env.PORT, () =>
  console.log(`Server is running on port:${Env.PORT}`)
);

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

app.use("/message",messageRouter)

