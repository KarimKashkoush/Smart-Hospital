/*
  Warnings:

  - You are about to drop the column `Department` on the `Receptionist` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Receptionist" DROP COLUMN "Department",
ADD COLUMN     "department" TEXT;
