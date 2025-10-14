import { Router } from "express";
import { createSongController, getAllSongsController,getSongController, deleteSongController, updateSongController } from "../controllers/SongController";

const router = Router();

router.post("/", createSongController)
router.get("/", getAllSongsController)
router.get("/:id", getSongController)
router.delete("/:id", deleteSongController)
router.put("/:id", updateSongController)

export default router;