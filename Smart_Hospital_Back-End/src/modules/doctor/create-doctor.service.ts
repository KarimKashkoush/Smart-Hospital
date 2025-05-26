import { Role } from "@prisma/client";
import { hashSync } from "bcryptjs";

import { db } from "src";
import { AppError } from "src/shared/app-error";

type TimeSlotData = {
      shift: "Morning" | "Evening";
      dayOfWeek: "Saturday" | "Sunday" | "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday";
      startTime: string; // مثال: "09:00"
      endTime: string;   // مثال: "12:00"
};

type DoctorData = {
      username: string;
      name: string;
      password: string;
      categoryId: number;
      birthDate: string;
      yearsofExperience: string;
      education: string;
      awards?: string;
      specializationLong: string;
      specializationShort: string;
      week: (
            | "Saturday"
            | "Sunday"
            | "Monday"
            | "Tuesday"
            | "Wednesday"
            | "Thursday"
            | "Friday"
      )[];
      timeSlots: TimeSlotData[];
      phone: string;
      email: string;
};

export const createDoctor = async ({
      username,
      password,
      name,
      categoryId,
      birthDate,
      yearsofExperience,
      education,
      awards,
      specializationLong,
      specializationShort,
      week,
      timeSlots,
      email,
      phone,
}: DoctorData) => {
      const existDoctor = await db.user.findUnique({
            where: {
                  username,
            },
      });
      if (existDoctor) {
            throw new AppError(400, "username is already in use");
      }



      const checkCategoryExists =
            (await db.category.count({ where: { id: categoryId } })) > 0;

      if (!checkCategoryExists) {
            throw new AppError(400, "Invalid category ID");
      }

      const doctor = await db.user.create({
            data: {
                  username: username,
                  passwordHash: hashSync(password, 10),
                  role: Role.doctor,
                  doctor: {
                        create: {
                              category: {
                                    connect: {
                                          id: categoryId,
                                    },
                              },
                              name,
                              birthDate: birthDate,
                              yearsofExperience: yearsofExperience,
                              education: education,
                              awards: awards,
                              specializationLong: specializationLong,
                              specializationShort: specializationShort,
                              week: week,
                              phone: phone,
                              email: email,
                              timeSlots: {
                                    createMany: {
                                          data: timeSlots.map((slot) => ({
                                                dayOfWeek: slot.dayOfWeek,
                                                shift: slot.shift,
                                                startTime: slot.startTime,
                                                endTime: slot.endTime,
                                          })),
                                    },
                              },
                        },
                  },
            },
            include: {
                  doctor: {
                        include: {
                              timeSlots: true,
                        },
                  },
            },
      });
      return { ...doctor.doctor, username: doctor.username, avatar: doctor.image };
};