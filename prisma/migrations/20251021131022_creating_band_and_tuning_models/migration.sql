/*
  Warnings:

  - You are about to drop the column `band` on the `Song` table. All the data in the column will be lost.
  - You are about to drop the column `tuning` on the `Song` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Song" DROP COLUMN "band",
DROP COLUMN "tuning",
ADD COLUMN     "bandId" INTEGER,
ADD COLUMN     "tuningId" INTEGER,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "Band" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Band_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tuning" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tuning_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Band_name_key" ON "Band"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Tuning_name_key" ON "Tuning"("name");

-- AddForeignKey
ALTER TABLE "Song" ADD CONSTRAINT "Song_bandId_fkey" FOREIGN KEY ("bandId") REFERENCES "Band"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Song" ADD CONSTRAINT "Song_tuningId_fkey" FOREIGN KEY ("tuningId") REFERENCES "Tuning"("id") ON DELETE SET NULL ON UPDATE CASCADE;
