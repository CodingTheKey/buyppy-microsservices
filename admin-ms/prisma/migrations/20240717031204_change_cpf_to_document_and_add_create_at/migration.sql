/*
  Warnings:

  - You are about to drop the column `cpf` on the `clients` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[document]` on the table `clients` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `created_at` to the `clients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `document` to the `clients` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "clients_cpf_key";

-- AlterTable
ALTER TABLE "clients" DROP COLUMN "cpf",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "document" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "clients_document_key" ON "clients"("document");
