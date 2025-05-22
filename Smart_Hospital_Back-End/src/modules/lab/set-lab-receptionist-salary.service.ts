import { StatusCodes } from "http-status-codes";
import { db } from "src";
import { AppError } from "src/shared/app-error";

export async function setLabReceptionistSalary({
  id,
  salary,
  bonus,
}: {
  id: string;
  salary: number;
  bonus: number;
}) {
  const doesExists =
    (await db.labReceptionist.count({ where: { userId: +id } })) > 0;

  if (!doesExists) {
    throw new AppError(StatusCodes.NOT_FOUND, "Lab receptionist was not found");
  }

  const labReceptionist = await db.labReceptionist.update({
    where: {
      userId: +id,
    },
    data: {
      salary,
      bonus,
    },
  });

  return labReceptionist;
}
