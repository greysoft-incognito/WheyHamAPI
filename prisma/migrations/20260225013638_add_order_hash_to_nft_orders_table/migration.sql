/*
  Warnings:

  - A unique constraint covering the columns `[order_hash]` on the table `nft_orders` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `order_hash` to the `nft_orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "nft_orders" ADD COLUMN     "order_hash" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "nft_orders_order_hash_key" ON "nft_orders"("order_hash");
