/*
  Warnings:

  - A unique constraint covering the columns `[date,timeSlotId]` on the table `Booking` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Booking_date_key";

-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'confirmed';

-- CreateIndex
CREATE UNIQUE INDEX "Booking_date_timeSlotId_key" ON "Booking"("date", "timeSlotId");
