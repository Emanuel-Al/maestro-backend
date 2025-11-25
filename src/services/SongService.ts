import prisma from "../config/prisma";
import { SongStatus } from "../generated/prisma";

export type SongCreateInput = {
    name: string, 
    band: {name: string}, 
    bandId: number,
    album: string,
    description?: string,
    tuning: {name: string},
    tuningId: number,
    status: SongStatus
}

export async function createSong(data: SongCreateInput){
    try{
        const band = await prisma.band.upsert({
            where: {name: data.band.name},
            update: {},
            create: {name: data.band.name}
        })
        const tuning = await prisma.tuning.upsert({
            where: {name: data.tuning.name},
            update: {},
            create: {name: data.tuning.name}
        })
        const song = await prisma.song.create({
            data: {
                name: data.name,
                album: data.album,
                description: data.description,
                status: data.status,
                bandId: band.id,
                tuningId: tuning.id,
            },
            include: {
                band: true,
                tuning: true,
            },
    });
        return song;  
    }catch(e){
        console.log(e);
        throw new Error("Erro ao criar música");
    }
}

export async function getAllSongs(){
    try{
        const songs = await prisma.song.findMany({
            include:{
                band:true,
                tuning:true,
            }
        });
        return songs;
    }catch(e:any){
        console.log(e);
        throw new Error("Erro ao pegar músicas");
    }
}

export async function getSong(id:number){
    try{
        const song = await prisma.song.findUnique({
            where: {id},
            include:{
                band: true,
                tuning: true,
            }
        });
        return song;
    }catch(e:any){
        console.log(e);
        throw new Error("Erro ao buscar a música");
    }
}

export async function deleteSong(id:number){
    try{
        const deletedSong = await prisma.song.findUnique({
            where:{id},
            select: {bandId: true, tuningId: true},
        })
        if (!deletedSong) throw new Error("Música não encontrada");

        const {bandId, tuningId} = deletedSong;

        await prisma.song.delete({
            where:{id},
            select:{id:true},
        })
        
        if(bandId){
        const bands = await prisma.song.findMany({
            where:{bandId},
        })

        if(bands.length === 0 && bandId != null){
            await prisma.band.delete({
                where:{id: bandId},
            })
        };
        }

        if(tuningId){
            const tuning = await prisma.song.findMany({
            where: {id},
            select:{id:true}
        });
            if(tuning.length == 0){
                await prisma.tuning.delete({
                    where:{id:tuningId}
                })
            }
        }

    }catch(e){
        console.log(e);
        throw new Error("Erro ao deletar música");
    }
}

export async function updateSong(id:number, data: Partial<SongCreateInput>){
    try{
        let bandId: number | undefined;
        let tuningId: number | undefined;

        if(data.band){
            const band = await prisma.band.upsert({
                where: {name: data.band.name},
                update: {},
                create: {name: data.band.name}
            });
            bandId = band.id;
        }

        if(data.tuning){
            const tuning = await prisma.tuning.upsert({
                where: {name: data.tuning.name},
                update: {},
                create: {name: data.tuning.name}
            });
            tuningId = tuning.id;
        }

        const song = prisma.song.update({
            where: {id},
            data:{
                name: data.name,
                album: data.album, 
                description: data.description,
                status: data.status,
                ...(bandId && {bandId}),
                ...(tuningId && {tuningId}),
            },
            include: {
                band: true,
                tuning: true,
            }
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