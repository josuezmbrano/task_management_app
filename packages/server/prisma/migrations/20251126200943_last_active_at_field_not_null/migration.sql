/*
  Warnings:

  - Made the column `lastActiveAt` on table `Session` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Session" ALTER COLUMN "lastActiveAt" SET NOT NULL,
ALTER COLUMN "lastActiveAt" SET DEFAULT CURRENT_TIMESTAMP;
