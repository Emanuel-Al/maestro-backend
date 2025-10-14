import { Router } from "express";
import { createSongController, getAllSongsController,getSongController, deleteSongController } from "../controllers/SongController";

const router = Router();

router.post("/", createSongController)
router.get("/", getAllSongsController)
router.get("/:id", getSongController)
router.delete("/:id", deleteSongController)

export default router;