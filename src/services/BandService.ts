import prisma from "../config/prisma";

export const getBandsById = async (userId: number) => {
  try {
    const bands = await prisma.band.findMany({
      where: { userId: userId },
    });
    return bands;
  } catch (e) {
    console.log(e);
    throw new Error("Erro ao buscar músicas");
  }
};
