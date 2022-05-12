import { Request, Response } from "express";
import primaryService from "../services/primaryService.js";

async function findMany(req: Request, res: Response) {
  const result = await primaryService.findMany();
  res.send({ result });
}

export default {
  findMany,
};
