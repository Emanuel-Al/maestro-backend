import {
  createSong,
  getAllSongs,
  getSong,
  deleteSong,
  updateSong,
  countStatus,
} from "../services/SongService";
import { Request, Response } from "express";

export const createSongController = async (req: Request, res: Response) => {
  try {
    const user = req.user as any;
    const songData = {
      ...req.body,
      userId: user.id,
    };
    const song = await createSong(songData);
    res.status(201).json(song);
  } catch (e: any) {
    console.log("Error message: ", e);
    res.status(500).json({ message: e.message || "Error creating song" });
  }
};
export const getAllSongsController = async (req: Request, res: Response) => {
  try {
    const user = req.user as any;
    const songs = await getAllSongs(user.id);
    res.status(200).json(songs);
  } catch (e: any) {
    res.status(500).json({ message: e.message || "Error retrieving songs" });
  }
};

export const getSongController = async (req: Request, res: Response) => {
  try {
    const user = req.user as any;
    const id = Number(req.params.id);
    const song = await getSong(id, user.id);
    res.status(200).json(song);
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
};

export const deleteSongController = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const user = req.user as any;
    await deleteSong(id, user.id);
    res.status(200).json({ message: "Song delete successfuly" });
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
};

export const updateSongController = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const user = req.user as any;
    const song = await updateSong(id, req.body, user.id);
    res.status(200).json({ message: "Song updated successfuly", song });
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
};

export const countStatusController = async (req: Request, res: Response) => {
  try {
    const user = req.user as any;
    const songCount = await countStatus(user.id);
    res.status(200).json(songCount);
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
};
