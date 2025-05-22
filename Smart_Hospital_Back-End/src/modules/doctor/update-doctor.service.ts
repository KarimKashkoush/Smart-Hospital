import { Doctor } from "@prisma/client";
import { hashSync } from "bcrypt";
import { StatusCodes } from "http-status-codes";
import { db } from "src";
import { AppError } from "src/shared/app-error";

type WeekDay =
  | "Saturday"
  | "Sunday"
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday";

export interface DoctorData {
  username?: string;
  password?: string;
  birthDate?: string;
  yearsofExperience?: string;
  specializationLong?: string;
  specializationShort?: string;
  education?: string;
  awards?: string;
  week?: WeekDay[];
  name?: string;
  profileImage?: string;
  phone?: string;
  email?: string;
}

export const updateDoctor = async (
  id: string,
  data: DoctorData,
): Promise<Doctor> => {
  const doctorId = Number(id);

  if (isNaN(doctorId)) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Invalid doctor ID");
  }

  const doctor = await db.doctor.findUnique({
    where: { userId: doctorId },
  });

  if (!doctor) {
    throw new AppError(StatusCodes.NOT_FOUND, "Doctor was not found");
  }

  // تحضير بيانات التحديث، مع التعامل مع كلمة المرور
  const updateData: Partial<DoctorData & { passwordHash?: string }> = {};

  if (data.username !== undefined) updateData.username = data.username;
  if (data.password !== undefined)
    updateData.passwordHash = hashSync(data.password, 10);
  if (data.birthDate !== undefined) updateData.birthDate = data.birthDate;
  if (data.yearsofExperience !== undefined)
    updateData.yearsofExperience = data.yearsofExperience;
  if (data.specializationLong !== undefined)
    updateData.specializationLong = data.specializationLong;
  if (data.specializationShort !== undefined)
    updateData.specializationShort = data.specializationShort;
  if (data.education !== undefined) updateData.education = data.education;
  if (data.awards !== undefined) updateData.awards = data.awards;
  if (data.week !== undefined) updateData.week = data.week;
  if (data.name !== undefined) updateData.name = data.name;
  if (data.profileImage !== undefined) updateData.profileImage = data.profileImage;
  if (data.phone !== undefined) updateData.phone = data.phone;
  if (data.email !== undefined) updateData.email = data.email;
  
  const updatedDoctor = await db.doctor.update({
    where: { userId: doctorId },
    data: updateData,
  });

  return updatedDoctor;
};
