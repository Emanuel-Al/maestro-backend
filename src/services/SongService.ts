import prisma from "../config/prisma";
import { SongStatus } from "../generated/prisma";

export type SongCreateInput = {
    name: string, 
    band: string, 
    album: string,
    description?: string,
    tuning: string,
    status: SongStatus
}

export async function createSong(data: SongCreateInput){
    try{
        const song = await prisma.song.create({data})
        return song;  
    }catch(e){
        console.log(e);
        throw new Error("Erro ao criar música");
    }
}

export async function getAllSongs(){
    try{
        const songs = await prisma.song.findMany();
        return songs;
    }catch(e:any){
        console.log(e);
        throw new Error("Erro ao pegar músicas");
    }
}

export async function getSong(id:number){
    try{
        const song = await prisma.song.findUnique({
            where: {id}
        });
        return song;
    }catch(e:any){
        console.log(e);
        throw new Error("Erro ao buscar a música");
    }
}

export async function deleteSong(id:number){
    try{
        const song = await prisma.song.delete({
            where:{id}
        })
        return song;
    }catch(e){
        console.log(e);
        throw new Error("Erro ao deletar música");
    }
}

export async function updateSong(id:number, data: Partial<SongCreateInput>){
    try{
        const song = prisma.song.update({
            where: {id},
            data,
        });
        return song;
    }catch(e:any){
        console.log(e);
        throw new Error("Erro ao atualizar música")
    }
}


export async function countStatus(){
    try{
        const songs = await prisma.song.groupBy({
            by: ['status'],
            _count: {status:true},
        });
        const result = {
            LEARNT: 0,
            LEARNING: 0,
            WANT_TO_LEARN: 0,
            PRACTICING: 0,
        }
        for (const item of songs) {
        result[item.status] = item._count.status;
  }
  return result;
    }catch(e:any){
        console.log(e);
    }

}