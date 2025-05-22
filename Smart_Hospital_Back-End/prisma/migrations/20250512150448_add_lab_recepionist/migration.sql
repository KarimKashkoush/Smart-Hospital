-- CreateTable
CREATE TABLE "LabReceptionist" (
    "userId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "birthDate" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "phone" TEXT NOT NULL,
    "onBoarding" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "salary" INTEGER,
    "bonus" INTEGER,

    CONSTRAINT "LabReceptionist_pkey" PRIMARY KEY ("userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "LabReceptionist_email_key" ON "LabReceptionist"("email");

-- AddForeignKey
ALTER TABLE "LabReceptionist" ADD CONSTRAINT "LabReceptionist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
