import { Router } from "express";
import { createSongController, getAllSongsController,getSongController, deleteSongController, updateSongController, countLearntController } from "../controllers/SongController";

const router = Router();

router.post("/", createSongController)
router.get("/", getAllSongsController)
router.get("/:id", getSongController)
router.delete("/:id", deleteSongController)
router.put("/:id", updateSongController)
router.get("/count/learnt", countLearntController)

export default router;