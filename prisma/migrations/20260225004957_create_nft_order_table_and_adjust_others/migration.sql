/*
  Warnings:

  - You are about to drop the column `createdAt` on the `configurations` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `configurations` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `nfts` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `nfts` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `nfts` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `personal_access_tokens` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `personal_access_tokens` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `emailVerificationCode` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `emailVerifiedAt` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `facebookId` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `googleId` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `users` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `configurations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `personal_access_tokens` table without a default value. This is not possible if the table is not empty.
  - Added the required column `first_name` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "NftOrderStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'FULFILLED', 'EXPIRED', 'CANCELLED');

-- AlterTable
ALTER TABLE "configurations" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "nfts" DROP COLUMN "createdAt",
DROP COLUMN "imageUrl",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "image_url" TEXT,
ADD COLUMN     "updated_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "personal_access_tokens" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "createdAt",
DROP COLUMN "emailVerificationCode",
DROP COLUMN "emailVerifiedAt",
DROP COLUMN "facebookId",
DROP COLUMN "firstName",
DROP COLUMN "googleId",
DROP COLUMN "lastName",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "email_verification_code" VARCHAR(64),
ADD COLUMN     "email_verified_at" TIMESTAMP(3),
ADD COLUMN     "facebook_id" VARCHAR(255),
ADD COLUMN     "first_name" TEXT NOT NULL,
ADD COLUMN     "google_id" VARCHAR(255),
ADD COLUMN     "last_name" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "nft_orders" (
    "id" TEXT NOT NULL,
    "nft_id" TEXT NOT NULL,
    "price" BIGINT NOT NULL,
    "status" "NftOrderStatus" NOT NULL,
    "listed_at" TIMESTAMP(3),
    "expires_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "remaining_quantity" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "nft_orders_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "nft_orders_nft_id_idx" ON "nft_orders"("nft_id");

-- AddForeignKey
ALTER TABLE "nft_orders" ADD CONSTRAINT "nft_orders_nft_id_fkey" FOREIGN KEY ("nft_id") REFERENCES "nfts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
