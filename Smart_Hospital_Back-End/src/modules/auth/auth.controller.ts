import { Request, Response, Router } from "express";
import { validateBody } from "src/shared/validate-body";
import { signUpSchema, signInSchema } from "./auth.validation";
import { signIn } from "./signin.service";
import { signUp } from "./signup.service";
import { StatusCodes } from "http-status-codes";
import { getPatientById } from "./get-patient.service";
import expressAsyncHandler from "express-async-handler";

const authRouter: Router = Router();

authRouter.post(
  "/login",
  validateBody(signInSchema),
  expressAsyncHandler(async (req: Request, res: Response) => {
    const { token, user } = await signIn(req.body);
    res.status(StatusCodes.OK).json({ token, user, message: "Successful" });
  }),
);
authRouter.post(
  "/register",
  validateBody(signUpSchema),
  expressAsyncHandler(async (req: Request, res: Response) => {
    const { token, user } = await signUp(req.body);

    res
      .status(StatusCodes.CREATED)
      .json({ token, user, message: "Successful" });
  }),
);


authRouter.get(
  "/getPatient/:id",
  expressAsyncHandler(async (req: Request, res: Response) => {
    const patient = await getPatientById(req.params.id); 
    res.status(200).json(patient);
  }),
);

import { getAllPatients } from "./get-all-patients.service";


authRouter.get(
  "/getAllPatients",
  expressAsyncHandler(async (req: Request, res: Response) => {
    const patients = await getAllPatients();
    res.status(StatusCodes.OK).json({ patients });
  }),
);



export default authRouter;
