import { Router } from "express";
import { getAllTuningController } from "../controllers/TuningController";
import passport from "passport";

const router = Router();

const authMidlleware = passport.authenticate("jwt", { session: false });

router.get("/", authMidlleware, getAllTuningController);

export default router;
