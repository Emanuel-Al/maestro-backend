import { getAllTuning } from "../services/TuningService";
import { Request, Response } from "express";

export const getAllTuningController = async (req:Request, res:Response) => {
    try{ 
        const tunings = await getAllTuning();   
        res.status(200).json(tunings);
    }catch(e){
        res.status(500).json({message: e})
    }

}