import { Request, Response, Router } from "express";
import expressAsyncHandler from "express-async-handler";
import { createReceptionist } from "./receptionist-create.service";
import { StatusCodes } from "http-status-codes";
import { checkRoles } from "src/shared/middlewares/checkRoles";
import { getReceptionistById } from "./receptionist.service";
import {
  createReceptionistSchema,
  updateReceptionistSchema,
} from "./receptionist.validation";
import { validateBody } from "src/shared/validate-body";
import { deleteReceptionist } from "./receptionist-delete.service";
import { updateReceptionist } from "./receptionist-update.service";
import { validateFiles } from "src/shared/validate-files";

const receptionistRouter: Router = Router();

receptionistRouter.post(
  "/create-receptionist",
  validateFiles({
    image: {
      required: false,
      mimeTypes: ["image/png", "image/jpg", "image/jpeg"],
    },
  }),
  validateBody(createReceptionistSchema),
  expressAsyncHandler(async (req: Request, res: Response) => {
    const receptionist = await createReceptionist(req.body, req.file);

    res
      .status(StatusCodes.CREATED)
      .json({ receptionist, message: "Successful" });
  }),
);

receptionistRouter.delete(
  "/delete-receptionist/:id",
  checkRoles(["admin"]),
  expressAsyncHandler(async (req: Request, res: Response) => {
    const receptionist = await deleteReceptionist(req.params.id);
    res.status(StatusCodes.OK).json({ receptionist, message: "Successful" });
  }),
);

receptionistRouter.patch(
  "/update-receptionist/:id",
  checkRoles(["receptionist", "admin"]),
  validateBody(updateReceptionistSchema),
  expressAsyncHandler(async (req: Request, res: Response) => {
    const receptionist = await updateReceptionist(req.params.id, req.body);
    res.status(StatusCodes.OK).json({ receptionist, message: "Successful" });
  }),
);


receptionistRouter.get(
  "/receptionist/:id",
  expressAsyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id;
    const receptionist = await getReceptionistById(id);
    res.status(StatusCodes.OK).json(receptionist);
  })
);



export default receptionistRouter;
