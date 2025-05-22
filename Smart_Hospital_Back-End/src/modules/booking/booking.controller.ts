import express, { Request, Response } from "express";
import { createBooking } from "./booking.service";
import { StatusCodes } from "http-status-codes";
import expressAsyncHandler from "express-async-handler";
// import { getBookings } from "./get-bookings.service";
import { validateBody } from "src/shared/validate-body";
import {
  createBookingSchema,
  rescheduleBookingSchema,
} from "./booking.validation";
import { getDoctorBookings } from "./get-booking.service";
import { deleteBooking } from "./delete-booking.service";
import { rescheduleBooking } from "./reschedule-booking.service";
import { checkRoles } from "src/shared/middlewares/checkRoles";

const bookingRouter = express.Router();

bookingRouter.post(
  "/create-booking",
  validateBody(createBookingSchema),
  checkRoles(["patient", "admin", "receptionist"]),
  expressAsyncHandler(async (req: Request, res: Response) => {
    const booking = await createBooking(req.body);
    res.status(StatusCodes.CREATED).json({ booking, message: "Successful" });
  }),
);

// bookingRouter.get(
//   "/get-booking",
//   checkRoles(["patient"]),
//   expressAsyncHandler(async (req: Request, res: Response) => {
//     const booking = await getBookings();
//     res.status(StatusCodes.OK).json({ booking, message: "Successful" });
//   }),
// );

bookingRouter.get(
  "/get-doctor-bookings/:id",
  checkRoles(["doctor", "admin", "receptionist"]),
  expressAsyncHandler(async (req: Request, res: Response) => {
    const booking = await getDoctorBookings(req.params.id);
    res.status(StatusCodes.OK).json({ booking, message: "Successful" });
  }),
);

bookingRouter.post(
  "/reschedule-booking",
  checkRoles(["doctor", "receptionist", "admin"]),
  validateBody(rescheduleBookingSchema),
  expressAsyncHandler(async (req: Request, res: Response) => {
    const { doctorBookings, booking } = await rescheduleBooking(
      req.body.bookingId,
      req.body.newTimeSlotId,
      req.body.date,
    );
    res
      .status(StatusCodes.OK)
      .json({ doctorBookings, booking, message: "Successful" });
  }),
);

bookingRouter.delete(
  "/delete-booking/:id",
  checkRoles(["admin", "receptionist", "patient"]),
  expressAsyncHandler(async (req: Request, res: Response) => {
    const booking = await deleteBooking(req.params.id);
    res.status(StatusCodes.OK).json({ booking, message: "Successful" });
  }),
);
export default bookingRouter;
