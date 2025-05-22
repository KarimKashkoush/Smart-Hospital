import { Request, Response, Router } from "express";
import expressAsyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import { validateBody } from "src/shared/validate-body";
import {
  createMedicalExcuseSchema,
  updateMedicalExcuseSchema,
} from "./excuse.validation";
import { validateFiles } from "src/shared/validate-files";
import { createMedicalExcuse } from "./create-excuse.service";
import { checkRoles } from "src/shared/middlewares/checkRoles";
import { getPatientMedicalExcuses } from "./get-patient-excuses.service";
import { getDoctorMedicalExcuses } from "./get-doctor-excuse.service";
import { setMedicalExcuseApproval } from "./set-excuse-approval.service";
import { updateMedicalExcuse } from "./update-excuse.service";
import { deleteMedicalExcuse } from "./delete-excuse.service";
import { z } from "zod";

export const medicalExcuseRouter = Router();
medicalExcuseRouter.post(
  "/create-medical-excuse",
  checkRoles(["patient"]),
  validateFiles({
    attachment: {
      required: false,
      mimeTypes: [
        "application/pdf",
        "image/jpg",
        "image/png",
        "image/jpeg",
        "application/docs",
      ],
    },
  }),
  validateBody(createMedicalExcuseSchema),
  expressAsyncHandler(async (req: Request, res: Response) => {
    const medicalExcuse = await createMedicalExcuse({
      ...req.body,
      attachment: req.files?.["attachment"]?.[0],
    });

    res
      .status(StatusCodes.CREATED)
      .json({ medicalExcuse, message: "Successful" });
  }),
);

medicalExcuseRouter.get(
  "/get-patient-medical-excuses/:id",
  checkRoles(["patient"]),
  expressAsyncHandler(async (req: Request, res: Response) => {
    const medicalExcuses = await getPatientMedicalExcuses(+req.params.id);

    res.status(StatusCodes.OK).json({ medicalExcuses, message: "Successful" });
  }),
);

medicalExcuseRouter.get(
  "/get-doctor-medical-excuses/:id",
  checkRoles(["doctor"]),
  expressAsyncHandler(async (req: Request, res: Response) => {
    const medicalExcuses = await getDoctorMedicalExcuses(+req.params.id);

    res.status(StatusCodes.OK).json({ medicalExcuses, message: "Successful" });
  }),
);

medicalExcuseRouter.post(
  "/set-medical-excuse-approval/:id",
  checkRoles(["doctor"]),
  validateBody(z.object({ status: z.enum(["approved", "rejected"]) })),
  expressAsyncHandler(async (req: Request, res: Response) => {
    const medicalExcuse = await setMedicalExcuseApproval(
      +req.params.id,
      req.body.status,
    );

    res.status(StatusCodes.OK).json({ medicalExcuse, message: "Successful" });
  }),
);

medicalExcuseRouter.patch(
  "/update-medical-excuse/:id",
  checkRoles(["patient", "doctor"]),
  validateBody(updateMedicalExcuseSchema),
  validateFiles({
    attachment: {
      required: false,
      mimeTypes: [
        "application/pdf",
        "image/jpg",
        "image/png",
        "image/jpeg",
        "application/docs",
      ],
    },
  }),
  expressAsyncHandler(async (req: Request, res: Response) => {
    const medicalExcuse = await updateMedicalExcuse(+req.params.id, {
      ...req.body,
      attachment: req.files?.["attachment"]?.[0],
    });

    res.status(StatusCodes.OK).json({ medicalExcuse, message: "Successful" });
  }),
);

medicalExcuseRouter.delete(
  "/delete-medical-excuse/:id",
  checkRoles(["patient", "doctor"]),
  expressAsyncHandler(async (req: Request, res: Response) => {
    const medicalExcuse = await deleteMedicalExcuse(+req.params.id);

    res.status(StatusCodes.OK).json({ medicalExcuse, message: "Successful" });
  }),
);
