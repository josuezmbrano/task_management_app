/*
  Warnings:

  - A unique constraint covering the columns `[session_public_id]` on the table `Session` will be added. If there are existing duplicate values, this will fail.
  - The required column `session_public_id` was added to the `Session` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Session" ADD COLUMN     "session_public_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Session_session_public_id_key" ON "Session"("session_public_id");
