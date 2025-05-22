-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_userId_fkey";

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
