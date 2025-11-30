import { Request, Response } from "express";
import IoRedis from "ioredis";
import {faker} from "@faker-js/faker"

const redisConnection = new IoRedis({ maxRetriesPerRequest: null });

export const createMessage = (req: Request, res: Response) => {
  try {
    const payload = {
        email:faker.internet.email(),
        message:faker.lorem.paragraph()
    }
    res.json(payload)
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};

export const fetchMessages = (req: Request, res: Response) => {
  try {


  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};
