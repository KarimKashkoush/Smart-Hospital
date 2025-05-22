/*
  Warnings:

  - The `gender` column on the `Receptionist` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "MedicalRecord" ALTER COLUMN "datetime" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Receptionist" ADD COLUMN     "Department" TEXT,
DROP COLUMN "gender",
ADD COLUMN     "gender" TEXT;
