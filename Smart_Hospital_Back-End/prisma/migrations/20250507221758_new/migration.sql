/*
  Warnings:

  - You are about to drop the `DoctorOnPatient` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `Awards` to the `Doctor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Education` to the `Doctor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `SpecializationLong` to the `Doctor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `SpecializationShort` to the `Doctor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `YearsofExperience` to the `Doctor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `birthDate` to the `Doctor` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "shift" AS ENUM ('Morning', 'Evening');

-- CreateEnum
CREATE TYPE "week" AS ENUM ('Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday');

-- DropForeignKey
ALTER TABLE "DoctorOnPatient" DROP CONSTRAINT "DoctorOnPatient_doctorId_fkey";

-- DropForeignKey
ALTER TABLE "DoctorOnPatient" DROP CONSTRAINT "DoctorOnPatient_patientId_fkey";

-- AlterTable
ALTER TABLE "Doctor" ADD COLUMN     "Awards" TEXT NOT NULL,
ADD COLUMN     "Education" TEXT NOT NULL,
ADD COLUMN     "SpecializationLong" TEXT NOT NULL,
ADD COLUMN     "SpecializationShort" TEXT NOT NULL,
ADD COLUMN     "YearsofExperience" TEXT NOT NULL,
ADD COLUMN     "birthDate" TEXT NOT NULL,
ADD COLUMN     "week" "week"[];

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "image" TEXT;

-- DropTable
DROP TABLE "DoctorOnPatient";

-- CreateTable
CREATE TABLE "TimeSlots" (
    "id" SERIAL NOT NULL,
    "hour" TIMESTAMP(3) NOT NULL,
    "shift" "shift" NOT NULL,
    "doctorId" INTEGER NOT NULL,
    "patientId" INTEGER NOT NULL,

    CONSTRAINT "TimeSlots_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TimeSlots" ADD CONSTRAINT "TimeSlots_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctor"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimeSlots" ADD CONSTRAINT "TimeSlots_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
