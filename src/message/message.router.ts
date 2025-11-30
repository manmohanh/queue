import { Router } from "express";
import { createMessage } from "./message.controller";

const messageRouter = Router();

messageRouter.post("/", createMessage);

export default messageRouter;
