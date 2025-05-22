// import { StatusCodes } from "http-status-codes";
// import { db } from "src";
// import { AppError } from "src/shared/app-error";

// type CreateTimeslotsData = {
//   doctorId: number;
//   shift: "Morning" | "Evening";
//   hour: Date;
// };

// export const createTimeslots = async (data: CreateTimeslotsData) => {
//   try {
//     const doctorId = data.doctorId;
//     if (isNaN(doctorId)) {
//       throw new AppError(StatusCodes.BAD_REQUEST, "Doctor ID must be a number");
//     }
//     const doctor = await db.doctor.findFirst({
//       where: {
//         userId: doctorId
//       },
//     });
//     if (!doctor) {
//       throw new AppError(StatusCodes.NOT_FOUND, "Doctor not found");
//     }
//     const timeslots = await db.timeSlots.create({
//       data: {
//         doctorId: doctor.userId,
//         shift: data.shift,
//         hour: data.hour,
//         patientId: null,
//       },
//     });
//     console.log(timeslots);
//     return timeslots;
//   } catch {
//     throw new AppError(StatusCodes.BAD_REQUEST, "Invalid ID");
//   }
// };
