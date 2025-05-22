-- DropForeignKey
ALTER TABLE "TimeSlots" DROP CONSTRAINT "TimeSlots_patientId_fkey";

-- AlterTable
ALTER TABLE "TimeSlots" ALTER COLUMN "patientId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "TimeSlots" ADD CONSTRAINT "TimeSlots_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "users"("userId") ON DELETE SET NULL ON UPDATE CASCADE;
