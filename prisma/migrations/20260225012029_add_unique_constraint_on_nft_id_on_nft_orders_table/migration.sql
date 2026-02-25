/*
  Warnings:

  - A unique constraint covering the columns `[nft_id]` on the table `nft_orders` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "nft_orders_nft_id_key" ON "nft_orders"("nft_id");
