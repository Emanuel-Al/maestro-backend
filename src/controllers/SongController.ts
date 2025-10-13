import createSong from "../services/SongService";
import { Request, Response } from "express";
export const createSongControler = async (req: Request,res: Response) =>{
    try{
        const song = await createSong(req.body);
        res.status(201).json(song);
    }catch(e: any){
        console.log("Error message: ", e);
        res.status(500).json({message: e.message || "Error creating song"})
    }   
}