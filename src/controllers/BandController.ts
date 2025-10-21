import { getAllBands } from "../services/BandService";
import { Request, Response } from "express";

export const getAllBandsController = async (req:Request, res:Response) => {
    try{
        const bands = await getAllBands();
        res.status(200).json(bands);
    }catch(e){
        res.status(500).json({message: e})
    }
}