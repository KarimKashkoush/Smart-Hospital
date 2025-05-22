import { Request, Response, Router } from "express";
import expressAsyncHandler from "express-async-handler";
import { validateBody } from "src/shared/validate-body";
import { complateBookingSchema, createDoctorSchema } from "./doctor.validation";
import { StatusCodes } from "http-status-codes";
import { checkRoles } from "src/shared/middlewares/checkRoles";
import { createDoctor } from "./create-doctor.service";
import { getDoctors, getDoctorDetails } from "./get-doctor.service";
import { updateDoctor } from "./update-doctor.service";
import { deleteDoctor } from "./delete-doctor.service";
import { complateBooking } from "./complate-booking.service";
import { validateFiles } from "src/shared/validate-files";

const doctorRouter: Router = Router();

doctorRouter.post(
  "/create-doctor",
  validateBody(createDoctorSchema),
  expressAsyncHandler(async (req: Request, res: Response) => {
    const doctor = await createDoctor(req.body);
    res.status(StatusCodes.CREATED).json({ doctor, message: "Successful" });
  }),
);
doctorRouter.post("/complate-booking/:id", checkRoles(["doctor"]), validateBody(complateBookingSchema), expressAsyncHandler(async (req: Request, res: Response) => {
  const bookingId = +req.params.id;
  const { treatmentDetails } = req.body;

  await complateBooking(bookingId, treatmentDetails);
  res
    .status(StatusCodes.CREATED)
    .json({ message: "Booking completed successfully" });
}));

doctorRouter.get(
  "/doctors",
  expressAsyncHandler(async (req: Request, res: Response) => {
    const doctors = await getDoctors();
    res.status(StatusCodes.OK).json({ doctors, message: "Successful" });
  }),
);

doctorRouter.get(
  "/get-doctor/:id",
  expressAsyncHandler(async (req: Request, res: Response) => {
    const doctor = await getDoctorDetails(req.params.id);
    res.status(StatusCodes.OK).json({ doctor, message: "Successful" });
  }),
);

doctorRouter.patch(
  "/update-doctor/:id",
  checkRoles(["admin", "doctor"]),
  validateFiles({
    profileImage: {
      required: false,
      mimeTypes: ["image/jpg", "image/png", "image/jpeg"],
    },
  }),
  expressAsyncHandler(async (req: Request, res: Response) => {
    // بنمرر بيانات التحديث، وبنضيف الصورة لو موجودة مع الـprefix "/"
    const doctor = await updateDoctor(req.params.id, req.body);

    res.status(StatusCodes.OK).json({ doctor, message: "Successful" });
  }),
);




doctorRouter.delete(
  "/delete-doctor/:id",
  checkRoles(["admin", "doctor"]),
  expressAsyncHandler(async (req: Request, res: Response) => {
    const doctor = await deleteDoctor(req.params.id);
    res.status(StatusCodes.OK).json({ doctor, message: "Successful" });
  }),
);
export default doctorRouter;
