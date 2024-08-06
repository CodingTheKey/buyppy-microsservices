/*
  Warnings:

  - You are about to drop the column `password` on the `clients` table. All the data in the column will be lost.
  - Added the required column `created_at` to the `address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deleted_at` to the `address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deleted_at` to the `clients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `observations` to the `clients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `clients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_at` to the `coupons` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deleted_at` to the `coupons` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `coupons` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_at` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deleted_at` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "clients_document_key";

-- AlterTable
ALTER TABLE "address" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "deleted_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "clients" DROP COLUMN "password",
ADD COLUMN     "deleted_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "observations" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "coupons" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "deleted_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "deleted_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
