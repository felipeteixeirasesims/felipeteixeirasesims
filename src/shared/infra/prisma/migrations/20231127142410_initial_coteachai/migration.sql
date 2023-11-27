/*
  Warnings:

  - You are about to drop the column `supervisorId` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `budgets` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `projects` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `usersprojects` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "OutputType" AS ENUM ('HTML', 'RICH_TEXT', 'TEXT');

-- CreateEnum
CREATE TYPE "InputType" AS ENUM ('TEXT_FIELD', 'CHOICE_FIELD', 'MULTIPLE_CHOICE_FIELD');

-- DropForeignKey
ALTER TABLE "budgets" DROP CONSTRAINT "budgets_projectId_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_supervisorId_fkey";

-- DropForeignKey
ALTER TABLE "usersprojects" DROP CONSTRAINT "usersprojects_projectId_fkey";

-- DropForeignKey
ALTER TABLE "usersprojects" DROP CONSTRAINT "usersprojects_userId_fkey";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "supervisorId",
ADD COLUMN     "city" VARCHAR(100),
ADD COLUMN     "country" VARCHAR(100),
ADD COLUMN     "grade" VARCHAR(100),
ADD COLUMN     "school" VARCHAR(100),
ADD COLUMN     "state" VARCHAR(100);

-- DropTable
DROP TABLE "budgets";

-- DropTable
DROP TABLE "projects";

-- DropTable
DROP TABLE "usersprojects";

-- DropEnum
DROP TYPE "ReadinessLevel";

-- CreateTable
CREATE TABLE "categories" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "description" VARCHAR(100),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "prompts" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "description" VARCHAR(100),
    "prompt" VARCHAR(255),
    "outputType" "OutputType" NOT NULL DEFAULT 'HTML',
    "creatorId" TEXT NOT NULL,
    "categoryId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "prompts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "promptremakes" (
    "id" TEXT NOT NULL,
    "promptId" VARCHAR(36) NOT NULL,
    "guidance" VARCHAR(255),
    "excerpt" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "promptremakes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "promptresults" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "promptId" VARCHAR(36) NOT NULL,
    "remakeId" TEXT,
    "used_prompt" TEXT NOT NULL,
    "generated_output" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "promptresults_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userfavorites" (
    "userId" VARCHAR(36) NOT NULL,
    "promptId" VARCHAR(36) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "userfavorites_pkey" PRIMARY KEY ("userId","promptId")
);

-- CreateTable
CREATE TABLE "inputs" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(30) NOT NULL,
    "type" "InputType" NOT NULL DEFAULT 'TEXT_FIELD',
    "value" VARCHAR(50),
    "order" INTEGER NOT NULL DEFAULT 0,
    "required" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "input_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inputalternatives" (
    "id" TEXT NOT NULL,
    "inputId" VARCHAR(36) NOT NULL,
    "description" VARCHAR(50) NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "inputalternatives_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_key" ON "categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "prompts_title_key" ON "prompts"("title");

-- AddForeignKey
ALTER TABLE "prompts" ADD CONSTRAINT "prompts_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "prompts" ADD CONSTRAINT "prompts_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "promptremakes" ADD CONSTRAINT "promptremakes_promptId_fkey" FOREIGN KEY ("promptId") REFERENCES "prompts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "promptresults" ADD CONSTRAINT "promptresults_promptId_fkey" FOREIGN KEY ("promptId") REFERENCES "prompts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "promptresults" ADD CONSTRAINT "promptresults_remakeId_fkey" FOREIGN KEY ("remakeId") REFERENCES "promptremakes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "userfavorites" ADD CONSTRAINT "userfavorites_promptId_fkey" FOREIGN KEY ("promptId") REFERENCES "prompts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "userfavorites" ADD CONSTRAINT "userfavorites_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "inputalternatives" ADD CONSTRAINT "inputalternatives_inputId_fkey" FOREIGN KEY ("inputId") REFERENCES "inputs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
