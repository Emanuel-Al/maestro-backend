import { getBandsById } from "../services/BandService";
import { Request, Response } from "express";

export const getAllBandsController = async (req: Request, res: Response) => {
  try {
    const user = req.user as any;
    const bands = await getBandsById(user.id);
    res.status(200).json(bands);
  } catch (e) {
    res.status(500).json({ message: e });
  }
};
