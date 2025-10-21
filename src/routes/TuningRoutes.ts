import { Router } from "express";
import { getAllTuningController } from "../controllers/TuningController";

const router = Router();

router.get("/", getAllTuningController);

export default router;