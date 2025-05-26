import { Request, Response, Router } from "express";
import expressAsyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import { validateBody } from "src/shared/validate-body";
import {
  createLabReceptionistSchema,
  createLabTestSchema,
  setLabReceptionistSalarySchema,
} from "./lab.validation";
import { createLabReceptionist } from "./create-lab-receptionist.service";
import { setLabReceptionistSalary } from "./set-lab-receptionist-salary.service";
import { checkRoles } from "src/shared/middlewares/checkRoles";
import { validateFiles } from "src/shared/validate-files";
import { createLabTest } from "./create-lab-test.service";
import { setLabTestStatus } from "./set-lab-test-status.service";
import { attachResutls } from "./attach-results.service";
import { getLabTests } from "./get-lab-tests.service";
import { z } from "zod";
import { AppError } from "src/shared/app-error";
import { setLabTestApproval } from "./set-lab-test-approval.service";

const labRouter: Router = Router();

labRouter.post(
  "/create-lab-receptionist",
  validateBody(createLabReceptionistSchema),
  expressAsyncHandler(async (req: Request, res: Response) => {
    const labReceptionist = await createLabReceptionist(req.body);
    res
      .status(StatusCodes.CREATED)
      .json({ labReceptionist, message: "Successful" });
  }),
);

labRouter.post(
  "/set-lab-receptionist-salary",
  checkRoles(["admin"]),
  validateBody(setLabReceptionistSalarySchema),
  checkRoles(["admin"]),
  expressAsyncHandler(async (req: Request, res: Response) => {
    const labReceptionist = await setLabReceptionistSalary(req.body);
    res.status(StatusCodes.OK).json({ labReceptionist, message: "Successful" });
  }),
);

labRouter.post(
  "/create-lab-test",
  checkRoles(["doctor", "lab"]),
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
  validateBody(createLabTestSchema),
  expressAsyncHandler(async (req: Request, res: Response) => {
    const labTest = await createLabTest({
      ...req.body,
      attachment: req.files?.["attachment"]?.[0], // زي الـ excuse
    });

    res.status(StatusCodes.CREATED).json({ labTest, message: "Successful" });
  }),
);


labRouter.post(
  "/lab-test-status/:id",
  checkRoles(["lab"]),
  validateBody(z.object({ status: z.enum(["completed", "pending"]) })),
  expressAsyncHandler(async (req: Request, res: Response) => {
    const labTest = await setLabTestStatus({
      id: Number(req.params.id),
      status: req.body.status,
    });
    res.status(StatusCodes.OK).json({ labTest, message: "Successful" });
  }),
);

labRouter.post(
  "/lab-test/attach-results/:id",
  checkRoles(["lab"]),
  validateFiles({
    attachment: {
      mimeTypes: [
        "application/pdf",
        "application/msword",
        "image/jpg",
        "image/jpeg",
        "image/png",
      ],
      required: true,
    },
  }),
  expressAsyncHandler(async (req: Request, res: Response) => {
    const labTest = await attachResutls({
      id: Number(req.params.id),
      file: req.files["attachment"][0],
    });
    res.status(StatusCodes.OK).json({ labTest, message: "Successful" });
  }),
);

labRouter.get(
  "/lab-tests",
  checkRoles(["lab"]),
  expressAsyncHandler(async (req: Request, res: Response) => {
    const filter = req.query?.filter?.toString();

    if (filter && !["all", "accepted"].includes(filter)) {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        "The filter query param must either be `all` or `accepted`",
      );
    }

    const labTest = await getLabTests({
      filter: filter === "accepted" ? "accepted" : "all",
    });

    res.status(StatusCodes.OK).json({ labTest, message: "Successful" });
  }),
);

labRouter.post(
  "/lab-test-approval/:id",
  checkRoles(["lab"]),
  validateBody(z.object({ accepted: z.boolean() })),
  expressAsyncHandler(async (req: Request, res: Response) => {
    const labTest = await setLabTestApproval({
      id: Number(req.params.id),
      accepted: req.body.accepted,
    });

    if (labTest)
      res.status(StatusCodes.OK).json({ labTest, message: "Successful" });

    if (!labTest) res.status(StatusCodes.OK).json({ message: "Successful" });
  }),
);

import { getLabReceptionistDetails } from "./get-lab-receptionist.service";

labRouter.get(
  "/get-lab-receptionist/:id",
  expressAsyncHandler(async (req: Request, res: Response) => {
    const labReceptionist = await getLabReceptionistDetails(req.params.id);
    res.status(StatusCodes.OK).json({ labReceptionist, message: "Successful" });
  }),
);







export default labRouter;
