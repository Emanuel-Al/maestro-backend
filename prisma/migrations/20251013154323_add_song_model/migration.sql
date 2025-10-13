-- CreateEnum
CREATE TYPE "SongStatus" AS ENUM ('WANT_TO_LEARN', 'LEARNING', 'PRACTICING', 'LEARNT');

-- CreateTable
CREATE TABLE "Song" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "band" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "tuning" TEXT NOT NULL,
    "status" "SongStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Song_pkey" PRIMARY KEY ("id")
);
