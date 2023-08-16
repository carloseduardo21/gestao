/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `sellers` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "sellers_userId_key" ON "sellers"("userId");
