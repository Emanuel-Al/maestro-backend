import { createSong, getAllSongs, getSong } from "../services/SongService";
import { Request, Response } from "express";
export const createSongController = async (req: Request,res: Response) =>{
    try{
        const song = await createSong(req.body);
        res.status(201).json(song);
    }catch(e: any){
        console.log("Error message: ", e);
        res.status(500).json({message: e.message || "Error creating song"})
    }   
}
export const getAllSongsController = async(req:Request, res:Response) => {
    try{
        const songs = await getAllSongs();
        res.status(201).json(songs);
    }catch(e:any){
        res.status(500).json({message: e.message || "Error retrieving songs"})
    }
}

export const getSongController = async(req:Request, res:Response) => {
    try{
        const id = Number(req.params.id)
        const song = await getSong(id);
        res.status(200).json(song);
    }catch(e:any){
        res.status(500).json({message: e.message})
    }
}