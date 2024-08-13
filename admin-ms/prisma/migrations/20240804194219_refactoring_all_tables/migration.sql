/*
  Warnings:

  - You are about to drop the column `zipCode` on the `address` table. All the data in the column will be lost.
  - You are about to drop the column `addressId` on the `clients` table. All the data in the column will be lost.
  - You are about to drop the column `discountPercentage` on the `coupons` table. All the data in the column will be lost.
  - You are about to drop the column `expirationDate` on the `coupons` table. All the data in the column will be lost.
  - You are about to drop the column `usageLimit` on the `coupons` table. All the data in the column will be lost.
  - The primary key for the `inventories` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `product_attributes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `products` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[address_id]` on the table `clients` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `zip_code` to the `address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address_id` to the `clients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `discount_percentage` to the `coupons` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expiration_date` to the `coupons` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usage_limit` to the `coupons` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "clients" DROP CONSTRAINT "clients_addressId_fkey";

-- DropForeignKey
ALTER TABLE "inventories" DROP CONSTRAINT "inventories_product_id_fkey";

-- DropForeignKey
ALTER TABLE "product_attributes" DROP CONSTRAINT "product_attributes_product_id_fkey";

-- DropIndex
DROP INDEX "clients_addressId_key";

-- AlterTable
ALTER TABLE "address" DROP COLUMN "zipCode",
ADD COLUMN     "zip_code" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "clients" DROP COLUMN "addressId",
ADD COLUMN     "address_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "coupons" DROP COLUMN "discountPercentage",
DROP COLUMN "expirationDate",
DROP COLUMN "usageLimit",
ADD COLUMN     "discount_percentage" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "expiration_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "usage_limit" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "inventories" DROP CONSTRAINT "inventories_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "product_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "inventories_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "inventories_id_seq";

-- AlterTable
ALTER TABLE "product_attributes" DROP CONSTRAINT "product_attributes_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "product_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "product_attributes_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "product_attributes_id_seq";

-- AlterTable
ALTER TABLE "products" DROP CONSTRAINT "products_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "products_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "products_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "clients_address_id_key" ON "clients"("address_id");

-- AddForeignKey
ALTER TABLE "clients" ADD CONSTRAINT "clients_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_attributes" ADD CONSTRAINT "product_attributes_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventories" ADD CONSTRAINT "inventories_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
