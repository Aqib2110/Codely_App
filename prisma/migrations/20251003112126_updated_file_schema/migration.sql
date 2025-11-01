/*
  Warnings:

  - You are about to drop the column `file` on the `file` table. All the data in the column will be lost.
  - Added the required column `fileContent` to the `file` table without a default value. This is not possible if the table is not empty.
  - Added the required column `filename` to the `file` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "file" DROP COLUMN "file",
ADD COLUMN     "fileContent" TEXT NOT NULL,
ADD COLUMN     "filename" TEXT NOT NULL;
