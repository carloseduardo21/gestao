-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'STOCKIST', 'PURCHASING', 'SELLER', 'ADMIN');

-- CreateEnum
CREATE TYPE "Unit" AS ENUM ('BALDE', 'BANDEJA', 'BARRA', 'BLOCO', 'BOBINA', 'CART', 'CX', 'CX2', 'CX3', 'CX5', 'CX10', 'CX15', 'CX20', 'CX25', 'CX50', 'CX100', 'FARDO', 'GRAMAS', 'KG', 'KIT', 'LATA', 'LITRO', 'M', 'PACOTE', 'PC', 'POTE', 'UN');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clients" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "cpf" TEXT,
    "cell" TEXT NOT NULL,
    "birth_date" TIMESTAMP(3),
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "delivery_address" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "zip" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "number" TEXT,
    "complement" TEXT,
    "district" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,

    CONSTRAINT "delivery_address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "suppliers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cnpj" TEXT,
    "cell" TEXT NOT NULL,
    "city" TEXT NOT NULL,

    CONSTRAINT "suppliers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "codeBar" TEXT NOT NULL,
    "refer" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "costPrice" DECIMAL(65,30) NOT NULL,
    "salePrice" DECIMAL(65,30) NOT NULL,
    "unit" "Unit" NOT NULL DEFAULT 'UN',

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "clients_cell_key" ON "clients"("cell");

-- CreateIndex
CREATE UNIQUE INDEX "suppliers_cell_key" ON "suppliers"("cell");

-- AddForeignKey
ALTER TABLE "delivery_address" ADD CONSTRAINT "delivery_address_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
