import { Express } from "express";
import { StatusCodes } from "http-status-codes";
import { db } from "src";
import { AppError } from "src/shared/app-error";

export async function attachResutls({
  id,
  file,
}: {
  id: number;
  file: Express.Multer.File;
}) {
  const filePath = "/" + file.filename;

  const checkTestExists = (await db.labTest.count({ where: { id } })) > 0;

  if (!checkTestExists) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Invalid lab test ID");
  }

  const labTest = await db.labTest.update({
    where: { id },
    data: { attachment: filePath },
  });

  return labTest;
}
