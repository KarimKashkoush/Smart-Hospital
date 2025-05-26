import { db } from "src";
import { AppError } from "src/shared/app-error";
import { StatusCodes } from "http-status-codes";

export const getPatientById = async (id: string) => {
      const userId = Number(id);

      if (isNaN(userId)) {
            throw new AppError(StatusCodes.BAD_REQUEST, "Invalid ID");
      }

      const patient = await db.patient.findUnique({
            where: { userId },
            include: {
                  user: {
                        select: {
                              username: true,
                              image: true,
                        },
                  },
                  MedicalExcuse: true,
                  medicalRecord: true,
                  LabTest: true,
                  
            },
      });

      if (!patient) {
            throw new AppError(StatusCodes.NOT_FOUND, "Patient not found");
      }

      return {
            ...patient,
            username: patient.user?.username ?? null,
            avatar: patient.user?.image ?? null,
      };
};
