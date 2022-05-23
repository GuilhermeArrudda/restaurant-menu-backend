/*
  Warnings:

  - A unique constraint covering the columns `[productId]` on the table `cartItens` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "cartItens_productId_key" ON "cartItens"("productId");
