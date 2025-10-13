import { Router } from "express";
import { createSongControler } from "../controllers/SongController";

const router = Router();

router.post("/", createSongControler)

export default router;