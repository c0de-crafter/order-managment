/*
  Warnings:

  - You are about to drop the column `purchaseCost` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `saleCost` on the `Order` table. All the data in the column will be lost.
  - Added the required column `cartId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Order` DROP COLUMN `purchaseCost`,
    DROP COLUMN `saleCost`,
    ADD COLUMN `cartId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Cart` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `startDate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_cartId_fkey` FOREIGN KEY (`cartId`) REFERENCES `Cart`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
