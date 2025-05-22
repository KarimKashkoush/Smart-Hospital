import { Request, Response, Router } from "express";
// import { createTimeslots } from "./create-timeslots.service";
import expressAsyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import { checkRoles } from "src/shared/middlewares/checkRoles";
import { getAllTimeSlots, getOneTimeSlot } from "./get-time-slots.service";
import { updateTimeSlot } from "./update.service";
import { deleteTimeSlot } from "./delete.service";
import { validateBody } from "src/shared/validate-body";
import { updateTimeSlotSchema } from "./timeslot.validation";

const timeSlotsRouter: Router = Router();

// timeslotsRouter.post(
//   "/create-timeslots",
//   checkRoles(["admin"]),
//   expressAsyncHandler(async (req: Request, res: Response) => {
//     const timeSlots = await createTimeslots(req.body);
//     res.status(StatusCodes.CREATED).json({ timeSlots, message: "Successful" });
//   }),
// );

timeSlotsRouter.get(
  "/get-timeslots",
  expressAsyncHandler(async (req: Request, res: Response) => {
    const timeSlots = await getAllTimeSlots();
    res.status(StatusCodes.OK).json({ timeSlots, message: "Successful" });
  }),
);

timeSlotsRouter.get(
  "/get-timeslot/:id",
  expressAsyncHandler(async (req: Request, res: Response) => {
    const timeSlots = await getOneTimeSlot(req.params.id);
    res.status(StatusCodes.OK).json({ timeSlots, message: "Successful" });
  }),
);

timeSlotsRouter.patch(
  "/update-timeslots/:id",
  checkRoles(["admin"]),
  validateBody(updateTimeSlotSchema),
  expressAsyncHandler(async (req: Request, res: Response) => {
    const timeSlots = await updateTimeSlot(req.params.id, req.body);
    res.status(StatusCodes.OK).json({ timeSlots, message: "Successful" });
  }),
);

timeSlotsRouter.delete(
  "/delete-timeslots/:id",
  checkRoles(["admin"]),
  expressAsyncHandler(async (req: Request, res: Response) => {
    const timeSlots = await deleteTimeSlot(req.params.id);
    res.status(StatusCodes.OK).json({ timeSlots, message: "Successful" });
  }),
);

export default timeSlotsRouter;
