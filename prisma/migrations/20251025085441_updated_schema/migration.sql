/*
  Warnings:

  - You are about to drop the column `projectId` on the `file` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[projectnameId]` on the table `Projects` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `projectnameId` to the `Projects` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."file" DROP CONSTRAINT "file_projectId_fkey";

-- AlterTable
ALTER TABLE "Projects" ADD COLUMN     "projectnameId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "file" DROP COLUMN "projectId";

-- CreateIndex
CREATE UNIQUE INDEX "Projects_projectnameId_key" ON "Projects"("projectnameId");

-- AddForeignKey
ALTER TABLE "Projects" ADD CONSTRAINT "Projects_projectnameId_fkey" FOREIGN KEY ("projectnameId") REFERENCES "ProjectName"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
