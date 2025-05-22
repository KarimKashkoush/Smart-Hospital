import { Router } from "express";
import authRouter from "./modules/auth/auth.controller";
import categoryRouter from "./modules/category/category.controller";
import doctorRouter from "./modules/doctor/doctor.controller";
import timeSlotsRouter from "./modules/timeslots/timeslots.controller";
import bookingRouter from "./modules/booking/booking.controller";
import labRouter from "./modules/lab/lab.controller";
import receptionistRouter from "./modules/receptionist/receptionist.controller";
import {medicalExcuseRouter} from "./modules/medical-excuse/excuse.controller";
import medicalRecordRouter from "./modules/medical-record/medical-record.controller";
const handlers = Router();

handlers.use(authRouter);
handlers.use(categoryRouter);
handlers.use(doctorRouter);
handlers.use(timeSlotsRouter);
handlers.use(bookingRouter);
handlers.use(labRouter);
handlers.use(receptionistRouter);
handlers.use(medicalExcuseRouter);
handlers.use(medicalRecordRouter);

export { handlers };
