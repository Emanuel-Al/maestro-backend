import { Router } from "express";
import { getAllBandsController } from "../controllers/BandController";
const router = Router();

router.get("/", getAllBandsController);

export default router;