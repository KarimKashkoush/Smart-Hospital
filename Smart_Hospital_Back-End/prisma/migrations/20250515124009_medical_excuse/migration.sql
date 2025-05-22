-- CreateEnum
CREATE TYPE "ExcuseStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateTable
CREATE TABLE "MedicalExcuse" (
    "id" SERIAL NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "reason" TEXT NOT NULL,
    "image" TEXT,
    "status" "ExcuseStatus" NOT NULL DEFAULT 'PENDING',
    "doctorId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MedicalExcuse_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MedicalExcuse" ADD CONSTRAINT "MedicalExcuse_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctor"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
