/*
  Warnings:

  - The `week` column on the `Doctor` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `patientId` on the `TimeSlots` table. All the data in the column will be lost.
  - Changed the type of `shift` on the `TimeSlots` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Made the column `doctorId` on table `TimeSlots` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "Shift" AS ENUM ('Morning', 'Evening');

-- CreateEnum
CREATE TYPE "Week" AS ENUM ('Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday');

-- DropForeignKey
ALTER TABLE "TimeSlots" DROP CONSTRAINT "TimeSlots_doctorId_fkey";

-- DropForeignKey
ALTER TABLE "TimeSlots" DROP CONSTRAINT "TimeSlots_patientId_fkey";

-- AlterTable
ALTER TABLE "Doctor" DROP COLUMN "week",
ADD COLUMN     "week" "Week"[];

-- AlterTable
ALTER TABLE "TimeSlots" DROP COLUMN "patientId",
DROP COLUMN "shift",
ADD COLUMN     "shift" "Shift" NOT NULL,
ALTER COLUMN "doctorId" SET NOT NULL;

-- DropEnum
DROP TYPE "shift";

-- DropEnum
DROP TYPE "week";

-- CreateTable
CREATE TABLE "Booking" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "patientId" INTEGER NOT NULL,
    "timeslotId" INTEGER NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Booking_date_key" ON "Booking"("date");

-- AddForeignKey
ALTER TABLE "TimeSlots" ADD CONSTRAINT "TimeSlots_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctor"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_timeslotId_fkey" FOREIGN KEY ("timeslotId") REFERENCES "TimeSlots"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
