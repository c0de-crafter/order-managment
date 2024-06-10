-- DropForeignKey
ALTER TABLE `Order` DROP FOREIGN KEY `Order_cartId_fkey`;

-- AlterTable
ALTER TABLE `Order` ADD COLUMN `purchaseCost` DOUBLE NULL,
    ADD COLUMN `saleCost` DOUBLE NULL,
    MODIFY `cartId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_cartId_fkey` FOREIGN KEY (`cartId`) REFERENCES `Cart`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
