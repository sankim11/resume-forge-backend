/*
  Warnings:

  - You are about to drop the column `content` on the `Resume` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Resume" DROP COLUMN "content",
ADD COLUMN     "education" TEXT,
ADD COLUMN     "experience" TEXT,
ADD COLUMN     "projects" TEXT,
ADD COLUMN     "skills" TEXT;
