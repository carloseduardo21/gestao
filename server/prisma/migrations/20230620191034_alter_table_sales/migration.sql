/*
  Warnings:

  - Added the required column `discount` to the `sales` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalSalePrice` to the `sales` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "sales" ADD COLUMN     "discount" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "totalSalePrice" DECIMAL(65,30) NOT NULL;
