import { StatusCodes } from "http-status-codes";
import { db } from "src";
import { AppError } from "src/shared/app-error";

export async function setLabTestStatus({
  id,
  status,
}: {
  id: number;
  status: "completed" | "pending";
}) {
  const checkTestExists = (await db.labTest.count({ where: { id } })) > 0;

  if (!checkTestExists) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Invalid lab test ID");
  }

  const labTest = await db.labTest.update({
    where: { id },
    data: {
      status,
    },
  });

  return labTest;
}
