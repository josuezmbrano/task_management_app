/*
  Warnings:

  - A unique constraint covering the columns `[refreshTokenHashed]` on the table `Session` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `refreshTokenExpiresAt` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `refreshTokenHashed` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Session" ADD COLUMN     "refreshTokenExpiresAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "refreshTokenHashed" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Session_refreshTokenHashed_key" ON "Session"("refreshTokenHashed");
