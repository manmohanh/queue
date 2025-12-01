import { Request, Response } from "express";
import { faker } from "@faker-js/faker";
import { Queue } from "bullmq";

const messageQ = new Queue("messageQ");
const settings = {
  removeOnComplete: true,
  removeOnError: true,
  removeOnFailed: true,
};

export const createMessage = async (req: Request, res: Response) => {
  try {
    const payload = {
      email: faker.internet.email(),
      message: faker.lorem.paragraph(),
    };
    await messageQ.add("sendMessage", payload, settings);

    res.json({ message: "Email added to queue" });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};

export const fetchMessages = async (req: Request, res: Response) => {
  try {
    const jobs = await messageQ.getJobs();
    res.json(jobs);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};

export const fetchMessageById = async (req: Request, res: Response) => {
  try {
    const job = await messageQ.getJob(req.params.id);
    if (!job) throw new Error(`Job not found with this id - ${req.params.id}`);
    res.json(job);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};

export const deleteJob = async (req: Request, res: Response) => {
  try {
    const job = await messageQ.getJob(req.params.id)
    if (!job) throw new Error(`Job not found with this id - ${req.params.id}`);
    await messageQ.remove(req.params.id)
    res.json({message:'Job deleted'});
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};



