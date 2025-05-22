/*
  Warnings:

  - Added the required column `accepted` to the `LabTest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LabTest" ADD COLUMN     "accepted" BOOLEAN NOT NULL;
