import { db } from "src";
import { AppError } from "src/shared/app-error";
import { StatusCodes } from "http-status-codes";
import { Prisma } from "@prisma/client";

type UpdateBookingData = {
      bookingId: number;
      status?: string;
      timeSlotId?: number;
      date?: string | Date;
      patientName?: string;
};


export const updateBooking = async (data: UpdateBookingData) => {
  const { bookingId, status, timeSlotId, date, patientName } = data;

  const booking = await db.booking.findUnique({ where: { id: bookingId } });
  if (!booking) {
    throw new AppError(StatusCodes.NOT_FOUND, "الحجز غير موجود");
  }

  let newDate: Date | undefined = undefined;
  if (date) {
    newDate = new Date(date);
    if (isNaN(newDate.getTime())) {
      throw new AppError(StatusCodes.BAD_REQUEST, "تنسيق تاريخ غير صحيح");
    }
  }

  if (timeSlotId) {
    const timeSlot = await db.timeSlots.findUnique({
      where: { id: timeSlotId },
    });
    if (!timeSlot) {
      throw new AppError(StatusCodes.NOT_FOUND, "الوقت المختار غير موجود");
    }
  }

  const updateData: Prisma.BookingUpdateInput = {};

  if (status) updateData.status = status;
  if (timeSlotId) updateData.timeSlot = { connect: { id: timeSlotId } };
  if (newDate) updateData.date = newDate;
  if (patientName) updateData.patientName = patientName;

  const updatedBooking = await db.booking.update({
    where: { id: bookingId },
    data: updateData,
  });

  return updatedBooking;
};
