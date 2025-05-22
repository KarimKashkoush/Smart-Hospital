/*
  Warnings:

  - Added the required column `diagnosis` to the `MedicalRecord` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MedicalRecord" ADD COLUMN     "diagnosis" TEXT NOT NULL;
