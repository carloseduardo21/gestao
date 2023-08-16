/*
  Warnings:

  - A unique constraint covering the columns `[codeBar]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[refer]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "codeBar" DROP NOT NULL,
ALTER COLUMN "refer" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Product_codeBar_key" ON "Product"("codeBar");

-- CreateIndex
CREATE UNIQUE INDEX "Product_refer_key" ON "Product"("refer");
