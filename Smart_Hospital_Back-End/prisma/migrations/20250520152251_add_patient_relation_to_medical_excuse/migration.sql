/*
  Warnings:

  - Added the required column `patientId` to the `MedicalExcuse` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MedicalExcuse" ADD COLUMN     "patientId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "MedicalExcuse" ADD CONSTRAINT "MedicalExcuse_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
