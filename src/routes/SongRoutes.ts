import { Router } from "express";
import { createSongController, getAllSongsController,getSongController } from "../controllers/SongController";

const router = Router();

router.post("/", createSongController)
router.get("/", getAllSongsController)
router.get("/:id", getSongController)

export default router;