/*
  Warnings:

  - Added the required column `promptId` to the `inputs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "inputs" ADD COLUMN     "promptId" VARCHAR(36) NOT NULL;

-- AddForeignKey
ALTER TABLE "inputs" ADD CONSTRAINT "inputs_promptId_fkey" FOREIGN KEY ("promptId") REFERENCES "prompts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
