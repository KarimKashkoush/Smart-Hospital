-- AlterTable
ALTER TABLE "MedicalExcuse" ADD COLUMN     "rejectionReason" TEXT,
ALTER COLUMN "status" SET DEFAULT 'Pending';
