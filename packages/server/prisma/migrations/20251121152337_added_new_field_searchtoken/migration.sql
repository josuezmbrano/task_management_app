/*
  Warnings:

  - A unique constraint covering the columns `[searchToken]` on the table `Session` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `searchToken` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Session" ADD COLUMN     "searchToken" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Session_searchToken_key" ON "Session"("searchToken");
