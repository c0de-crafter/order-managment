/*
  Warnings:

  - You are about to drop the column `code` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `statusId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `website` on the `Supplier` table. All the data in the column will be lost.
  - You are about to drop the `OrderStatus` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `status` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Order` DROP FOREIGN KEY `Order_statusId_fkey`;

-- AlterTable
ALTER TABLE `Order` DROP COLUMN `code`,
    DROP COLUMN `statusId`,
    ADD COLUMN `status` VARCHAR(191) NOT NULL,
    MODIFY `details` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Supplier` DROP COLUMN `website`;

-- DropTable
DROP TABLE `OrderStatus`;
