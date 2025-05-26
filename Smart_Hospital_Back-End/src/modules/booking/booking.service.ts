import { StatusCodes } from "http-status-codes";
import { db } from "src";
import { AppError } from "src/shared/app-error";

type CreateBookingData = {
  timeSlotId: number;
  patientId?: number;
  dateTime: string | Date;
  patientName: string;
};


export const createBooking = async (data: CreateBookingData) => {
  const { timeSlotId, dateTime, patientId, patientName } = data;

  if (!dateTime) {
    throw new AppError(StatusCodes.BAD_REQUEST, "تاريخ ووقت الحجز مطلوب");
  }

  const date = new Date(dateTime);

  if (isNaN(date.getTime())) {
    throw new AppError(StatusCodes.BAD_REQUEST, "تنسيق تاريخ ووقت غير صحيح");
  }

  if (!patientName) {
    throw new AppError(StatusCodes.BAD_REQUEST, "اسم المريض مطلوب");
  }

  const timeSlot = await db.timeSlots.findUnique({
    where: { id: timeSlotId },
    select: { doctorId: true },
  });

  if (!timeSlot) {
    throw new AppError(StatusCodes.NOT_FOUND, "الطبيب أو الوقت غير موجود");
  }

  if (patientId) {
    const existingBooking = await db.booking.findFirst({
      where: {
        patient: { userId: patientId },
        timeSlot: { doctorId: timeSlot.doctorId },
        status: { not: "Cancelled" }
      },
    });

    if (existingBooking) {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        "لا يمكنك الحجز مع نفس الطبيب أكثر من مرة."
      );
    }
  }

  const booking = await db.booking.create({
    data: {
      timeSlot: { connect: { id: timeSlotId } },
      date,
      patientName,
      ...(patientId && {
        patient: { connect: { userId: patientId } },
      }),
    },
  });

  return booking;
};


