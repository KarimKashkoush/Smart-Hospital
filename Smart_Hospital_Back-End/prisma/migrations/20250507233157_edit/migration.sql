/*
  Warnings:

  - You are about to drop the column `Awards` on the `Doctor` table. All the data in the column will be lost.
  - You are about to drop the column `Education` on the `Doctor` table. All the data in the column will be lost.
  - You are about to drop the column `SpecializationLong` on the `Doctor` table. All the data in the column will be lost.
  - You are about to drop the column `SpecializationShort` on the `Doctor` table. All the data in the column will be lost.
  - You are about to drop the column `YearsofExperience` on the `Doctor` table. All the data in the column will be lost.
  - Added the required column `awards` to the `Doctor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `education` to the `Doctor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `specializationLong` to the `Doctor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `specializationShort` to the `Doctor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `yearsofExperience` to the `Doctor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Doctor" DROP COLUMN "Awards",
DROP COLUMN "Education",
DROP COLUMN "SpecializationLong",
DROP COLUMN "SpecializationShort",
DROP COLUMN "YearsofExperience",
ADD COLUMN     "awards" TEXT NOT NULL,
ADD COLUMN     "education" TEXT NOT NULL,
ADD COLUMN     "specializationLong" TEXT NOT NULL,
ADD COLUMN     "specializationShort" TEXT NOT NULL,
ADD COLUMN     "yearsofExperience" TEXT NOT NULL;
