import { StatusCodes } from "http-status-codes";
import { db } from "src";
import { AppError } from "src/shared/app-error";

export const getLabReceptionistDetails = async (id: string) => {
      try {
            const receptionist = await db.labReceptionist.findFirst({
                  where: {
                        userId: Number(id),
                  },
                  include: {
                        User: {  // هنا حط اسم العلاقة بالظبط من الموديل (بحرف كبير)
                              select: {
                                    username: true,
                                    image: true,
                                    role: true,
                              },
                        },
                        supervisor: {
                              select: {
                                    userId: true,
                                    name: true,
                              },
                        },
                  },
            });

            if (!receptionist) {
                  throw new AppError(StatusCodes.NOT_FOUND, "Lab Receptionist not found");
            }

            return {
                  id: receptionist.userId,
                  name: receptionist.name,
                  email: receptionist.email,
                  phone: receptionist.phone,
                  gender: receptionist.gender,
                  birthDate: receptionist.birthDate,
                  salary: receptionist.salary,
                  bonus: receptionist.bonus,
                  supervisor: receptionist.supervisor,
                  username: receptionist.User?.username,  // برضه بحرف كبير زي في include
                  avatar: receptionist.User?.image,
                  role: receptionist.User?.role,
            };
      } catch {
            throw new AppError(StatusCodes.BAD_REQUEST, "Invalid ID");
      }
};
