/*
  Warnings:

  - Added the required column `patientname` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "patientname" TEXT NOT NULL;
