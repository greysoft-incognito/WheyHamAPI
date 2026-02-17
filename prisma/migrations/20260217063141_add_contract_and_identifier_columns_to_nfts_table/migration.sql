/*
  Warnings:

  - A unique constraint covering the columns `[identifier]` on the table `nfts` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `contract` to the `nfts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `identifier` to the `nfts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "nfts" ADD COLUMN     "contract" TEXT NOT NULL,
ADD COLUMN     "identifier" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "nfts_identifier_key" ON "nfts"("identifier");
