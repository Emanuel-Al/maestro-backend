import { getTuningById } from "../services/TuningService";
import { Request, Response } from "express";

export const getAllTuningController = async (req: Request, res: Response) => {
  try {
    const user = req.user as any;
    const tunings = await getTuningById(user.id);
    res.status(200).json(tunings);
  } catch (e) {
    res.status(500).json({ message: e });
  }
};
