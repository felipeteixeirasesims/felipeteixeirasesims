/*
  Warnings:

  - Added the required column `userId` to the `promptresults` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "promptresults" ADD COLUMN     "userId" VARCHAR(36) NOT NULL;

-- AddForeignKey
ALTER TABLE "promptresults" ADD CONSTRAINT "promptresults_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
