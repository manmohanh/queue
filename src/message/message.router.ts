import { Router } from "express";
import { createMessage, deleteJob, fetchMessageById, fetchMessages } from "./message.controller";

const messageRouter = Router();

messageRouter.post("/", createMessage);
messageRouter.get("/", fetchMessages);
messageRouter.get("/:id", fetchMessageById);
messageRouter.delete("/:id", deleteJob);

export default messageRouter;
