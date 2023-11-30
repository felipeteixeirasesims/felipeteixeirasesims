/*
  Warnings:

  - You are about to drop the column `remakeId` on the `promptresults` table. All the data in the column will be lost.
  - Added the required column `userId` to the `promptremakes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "promptresults" DROP CONSTRAINT "promptresults_remakeId_fkey";

-- AlterTable
ALTER TABLE "promptremakes" ADD COLUMN     "userId" VARCHAR(36) NOT NULL;

-- AlterTable
ALTER TABLE "promptresults" DROP COLUMN "remakeId";

-- AddForeignKey
ALTER TABLE "promptremakes" ADD CONSTRAINT "promptremakes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
