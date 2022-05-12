import { Router } from "express";
import primaryController from "../controllers/primaryController.js";

const primaryRouter = Router();

primaryRouter.get(
  "/primary",
  primaryController.findMany
);

export default primaryRouter;
