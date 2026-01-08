import { Router } from "express";
import {
  createSongController,
  getAllSongsController,
  getSongController,
  deleteSongController,
  updateSongController,
  countStatusController,
} from "../controllers/SongController";
import passport from "passport";
const router = Router();

const authMidlleware = passport.authenticate("jwt", { session: false });

router.get("/count", authMidlleware, countStatusController);
router.post("/", authMidlleware, createSongController);
router.get("/", authMidlleware, getAllSongsController);
router.get("/:id", authMidlleware, getSongController);
router.delete("/:id", authMidlleware, deleteSongController);
router.put("/:id", authMidlleware, updateSongController);

export default router;
