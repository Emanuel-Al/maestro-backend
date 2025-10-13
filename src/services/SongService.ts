import prisma from "../config/prisma";
import { SongStatus } from "../generated/prisma";

type SongCreateInput = {
    name: string, 
    band: string, 
    album: string,
    description: string,
    tuning: string,
    status: SongStatus
}

async function createSong(data: SongCreateInput){
    try{
        const song = await prisma.song.create({data})
        return song;
    }catch(e){
        console.log(e);
        throw new Error("Erro ao criar música");
    }
}

export default createSong;