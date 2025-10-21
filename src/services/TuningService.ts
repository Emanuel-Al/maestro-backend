import prisma from "../config/prisma"

export const getAllTuning = async () => {
    try{
    const tuning = await prisma.tuning.findMany();
    return tuning;
    }catch(e){
        console.log(e);
        throw new Error("Erro ao buscar as afinações");
    }
}