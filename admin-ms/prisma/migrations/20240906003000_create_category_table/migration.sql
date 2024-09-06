/*
  Warnings:

  - You are about to drop the column `category` on the `products` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "product_attributes" DROP CONSTRAINT "product_attributes_categoryId_fkey";

-- AlterTable
ALTER TABLE "products" DROP COLUMN "category",
ADD COLUMN     "categoryId" TEXT;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;
