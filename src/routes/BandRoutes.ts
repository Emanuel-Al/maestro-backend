import { Router } from "express";
import { getAllBandsController } from "../controllers/BandController";
import passport from "passport";
const router = Router();
const authMidlleware = passport.authenticate("jwt", { session: false });

router.get("/", authMidlleware, getAllBandsController);

export default router;
