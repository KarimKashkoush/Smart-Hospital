import { StatusCodes } from "http-status-codes";
import { db } from "src";
import { AppError } from "src/shared/app-error";

export async function setLabTestApproval({
  id,
  accepted,
}: {
  id: number;
  accepted: boolean;
}) {
  const checkTestExists = (await db.labTest.count({ where: { id } })) > 0;

  if (!checkTestExists)
    throw new AppError(StatusCodes.BAD_REQUEST, "Invalid lab test ID");

  if (accepted === true) {
    const labTest = await db.labTest.update({
      where: { id },
      data: { accepted: true },
    });

    return labTest;
  }

  await db.labTest.delete({
    where: { id },
  });

  return null;
}
