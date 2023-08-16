/*
  Warnings:

  - A unique constraint covering the columns `[productId]` on the table `stocks` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "stocks_productId_key" ON "stocks"("productId");
