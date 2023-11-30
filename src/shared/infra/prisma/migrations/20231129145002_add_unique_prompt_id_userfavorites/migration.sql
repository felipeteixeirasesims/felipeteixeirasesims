/*
  Warnings:

  - A unique constraint covering the columns `[promptId]` on the table `userfavorites` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "inputs" RENAME CONSTRAINT "input_pkey" TO "inputs_pkey";

-- CreateIndex
CREATE UNIQUE INDEX "userfavorites_promptId_key" ON "userfavorites"("promptId");
