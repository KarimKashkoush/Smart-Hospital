/*
  Warnings:

  - Added the required column `patientId` to the `LabTest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LabTest" ADD COLUMN     "patientId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "LabTest" ADD CONSTRAINT "LabTest_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
