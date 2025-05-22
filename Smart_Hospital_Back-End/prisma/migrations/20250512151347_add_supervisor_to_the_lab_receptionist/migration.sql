/*
  Warnings:

  - Added the required column `supervisorId` to the `LabReceptionist` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LabReceptionist" ADD COLUMN     "supervisorId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "LabReceptionist" ADD CONSTRAINT "LabReceptionist_supervisorId_fkey" FOREIGN KEY ("supervisorId") REFERENCES "Doctor"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
