import prisma from "../config/prisma";

export const getTuningById = async (userId: number) => {
  try {
    const tuning = await prisma.tuning.findMany({
      where: { userId: userId },
    });
    return tuning;
  } catch (e) {
    console.log(e);
    throw new Error("Erro ao buscar as afinações");
  }
};
