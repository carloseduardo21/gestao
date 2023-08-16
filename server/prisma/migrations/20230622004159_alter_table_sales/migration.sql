/*
  Warnings:

  - A unique constraint covering the columns `[requestNumber]` on the table `sales` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('pix', 'money', 'debt', 'credit');

-- AlterTable
ALTER TABLE "sales" ADD COLUMN     "paymentMethod" "PaymentMethod" NOT NULL DEFAULT 'money',
ADD COLUMN     "requestNumber" SERIAL NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "sales_requestNumber_key" ON "sales"("requestNumber");
