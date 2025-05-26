import { StatusCodes } from "http-status-codes";
import { db } from "src";
import { AppError } from "src/shared/app-error";
import { Week } from "@prisma/client";

type CreateTimeslotsData = {
      doctorId: number;
      shift: "Morning" | "Evening";
      dayOfWeek: string;
      startTime: string;
      endTime: string;
};

export const createTimeslots = async (data: CreateTimeslotsData) => {
      try {
            const { doctorId, shift, dayOfWeek, startTime, endTime } = data;

            if (isNaN(doctorId)) {
                  throw new AppError(StatusCodes.BAD_REQUEST, "رقم الطبيب غير صحيح");
            }

            const doctor = await db.doctor.findFirst({
                  where: { userId: doctorId },
            });

            if (!doctor) {
                  throw new AppError(StatusCodes.NOT_FOUND, "لم يتم العثور على الطبيب");
            }

            const timeslot = await db.timeSlots.create({
                  data: {
                        doctorId: doctor.userId,
                        shift,
                        dayOfWeek: dayOfWeek as Week,
                        startTime,
                        endTime,
                  },
            });

            return timeslot;
      } catch (error: unknown) {
            console.error(error);

            if (error instanceof AppError) {
                  throw error;
            }

            const message =
                  typeof error === "object" &&
                        error !== null &&
                        "message" in error &&
                        typeof (error as { message: unknown }).message === "string"
                        ? `حدث خطأ أثناء إنشاء الموعد: ${(error as { message: string }).message}`
                        : "حدث خطأ أثناء إنشاء الموعد، يرجى المحاولة مرة أخرى.";

            throw new AppError(StatusCodes.BAD_REQUEST, message);
      }
};
