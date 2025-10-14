import { Router } from "express";
import { createSongController, getAllSongsController } from "../controllers/SongController";

const router = Router();

router.post("/", createSongController)
router.get("/", getAllSongsController)

export default router;