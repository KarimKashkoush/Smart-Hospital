/*
  Warnings:

  - The values [PENDING,APPROVED,REJECTED] on the enum `ExcuseStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `patientname` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `timeslotId` on the `Booking` table. All the data in the column will be lost.
  - Added the required column `patientName` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timeSlotId` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ExcuseStatus_new" AS ENUM ('pending', 'approved', 'rejected');
ALTER TABLE "MedicalExcuse" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "MedicalExcuse" ALTER COLUMN "status" TYPE "ExcuseStatus_new" USING ("status"::text::"ExcuseStatus_new");
ALTER TYPE "ExcuseStatus" RENAME TO "ExcuseStatus_old";
ALTER TYPE "ExcuseStatus_new" RENAME TO "ExcuseStatus";
DROP TYPE "ExcuseStatus_old";
ALTER TABLE "MedicalExcuse" ALTER COLUMN "status" SET DEFAULT 'pending';
COMMIT;

-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_timeslotId_fkey";

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "patientname",
DROP COLUMN "timeslotId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "patientName" TEXT NOT NULL,
ADD COLUMN     "timeSlotId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Doctor" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "LabReceptionist" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "LabTest" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "MedicalExcuse" ALTER COLUMN "status" SET DEFAULT 'pending';

-- AlterTable
ALTER TABLE "Receptionist" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "TimeSlots" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_timeSlotId_fkey" FOREIGN KEY ("timeSlotId") REFERENCES "TimeSlots"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
