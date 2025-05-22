import { db } from "src";

import { AppError } from "src/shared/app-error";


export const complateBooking = async (
  bookingId: number,
  treatmentDetails: string
) => {
  const booking =await db.booking.findUnique({
    where: { id: bookingId },
    include:{timeSlot:true}
  });

  if (!booking) {
    throw new AppError(404,"Booking not found");
  }
  await db.medicalRecord.create({
    data: {
      patientId: booking.patientId,
      doctorId: booking.timeSlot.doctorId,
      treatmentDetails: treatmentDetails
    },
  });
  await db.booking.delete({ where: { id: bookingId } });
};
