/*
  Warnings:

  - You are about to drop the column `birthOfDate` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `mobileNumber` on the `users` table. All the data in the column will be lost.
  - Added the required column `birthDate` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `users` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `gender` on the `users` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('male', 'female');

-- AlterTable
ALTER TABLE "users" DROP COLUMN "birthOfDate",
DROP COLUMN "mobileNumber",
ADD COLUMN     "birthDate" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL,
DROP COLUMN "gender",
ADD COLUMN     "gender" "Gender" NOT NULL;

-- DropEnum
DROP TYPE "gender";
