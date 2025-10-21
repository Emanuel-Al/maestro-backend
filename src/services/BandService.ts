import prisma from '../config/prisma'

export const getAllBands = async () => {
    try{
        const bands = await prisma.band.findMany();
        return bands;
    }catch(e){
        console.log(e);
        throw new Error("Erro ao buscar músicas");
    }
} 