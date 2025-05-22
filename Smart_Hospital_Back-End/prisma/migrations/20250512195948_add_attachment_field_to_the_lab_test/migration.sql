/*
  Warnings:

  - Added the required column `attachment` to the `LabTest` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `status` on the `LabTest` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "TestStatus" AS ENUM ('pending', 'completed');

-- AlterTable
ALTER TABLE "LabTest" ADD COLUMN     "attachment" TEXT NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "TestStatus" NOT NULL;
