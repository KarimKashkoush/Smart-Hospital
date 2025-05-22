-- DropForeignKey
ALTER TABLE "TimeSlots" DROP CONSTRAINT "TimeSlots_doctorId_fkey";

-- AlterTable
ALTER TABLE "TimeSlots" ALTER COLUMN "doctorId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "TimeSlots" ADD CONSTRAINT "TimeSlots_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctor"("userId") ON DELETE SET NULL ON UPDATE CASCADE;
