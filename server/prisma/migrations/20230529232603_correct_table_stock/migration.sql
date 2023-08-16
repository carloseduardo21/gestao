/*
  Warnings:

  - You are about to alter the column `current` on the `stocks` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.

*/
-- AlterTable
ALTER TABLE "stocks" ALTER COLUMN "current" SET DATA TYPE INTEGER;
