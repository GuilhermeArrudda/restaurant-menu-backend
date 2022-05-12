import { Router } from "express";
import primaryRouter from "./primaryRouter.js";


const router = Router();
router.use(primaryRouter);
export default router;
