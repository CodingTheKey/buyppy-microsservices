/*
  Warnings:

  - You are about to drop the column `key` on the `product_attributes` table. All the data in the column will be lost.
  - You are about to drop the `inventories` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `attribute_id` to the `product_attributes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "inventories" DROP CONSTRAINT "inventories_product_id_fkey";

-- AlterTable
ALTER TABLE "product_attributes" DROP COLUMN "key",
ADD COLUMN     "attribute_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "inventories";

-- CreateTable
CREATE TABLE "attributes" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "attributes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_stocks" (
    "id" TEXT NOT NULL,
    "product_attribute_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "product_stocks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "attributes_key_key" ON "attributes"("key");

-- AddForeignKey
ALTER TABLE "product_attributes" ADD CONSTRAINT "product_attributes_attribute_id_fkey" FOREIGN KEY ("attribute_id") REFERENCES "attributes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_stocks" ADD CONSTRAINT "product_stocks_product_attribute_id_fkey" FOREIGN KEY ("product_attribute_id") REFERENCES "product_attributes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
