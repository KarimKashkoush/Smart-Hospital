import { Router, Request, Response } from "express";
import { createMedicalRecord } from "./create-medical-record.service";
import { getMedicalRecords } from "./get-medical-records.service";
import { validateBody } from "src/shared/validate-body";
import { StatusCodes } from "http-status-codes";
import { checkRoles } from "src/shared/middlewares/checkRoles";
import { createMedicalRecordSchema } from "./medical-record.validation"; // تأكد من مسار الاستيراد
import { z } from "zod";
const medicalRecordRouter: Router = Router();

medicalRecordRouter.post(
      "/create-medical-record",
      checkRoles(["doctor", "admin"]), // بس الدكتور يقدر يضيف
      validateBody(createMedicalRecordSchema), // يتحقق من صحة البيانات
      async (req: Request, res: Response) => {
            try {
                  const medicalRecord = await createMedicalRecord(req.body);
                  res.status(StatusCodes.CREATED).json(medicalRecord);
            } catch (error: unknown) {
                  console.error("Error in create-medical-record:", error); // ✨ أضف دي
                  if (error instanceof z.ZodError) {
                        res.status(StatusCodes.BAD_REQUEST).json({
                              message: "Validation error",
                              errors: error.errors,
                        });
                  } else {
                        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                              message: "Internal server error",
                        });
                  }
            }
      }
);

medicalRecordRouter.get(
      "/medical-records",
      async (_req: Request, res: Response) => {
            try {
                  const records = await getMedicalRecords();
                  res.status(StatusCodes.OK).json(records);
            } catch (error: unknown) {
                  if (error instanceof Error) {
                        res.status(500).json({ message: error.message });
                  } else {
                        res.status(500).json({ message: "Unknown Error" });
                  }
            }
      }
);

export default medicalRecordRouter;
