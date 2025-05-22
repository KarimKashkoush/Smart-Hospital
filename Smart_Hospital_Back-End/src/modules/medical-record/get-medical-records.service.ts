import { db } from "src";

export const getMedicalRecords = async () => {
      const records = await db.medicalRecord.findMany({
            include: {
                  doctor: {
                        select: {
                              userId: true,
                              name: true,
                              email: true,
                              phone: true,
                        },
                  },
                  patient: {
                        select: {
                              userId: true,
                              name: true,
                              email: true,
                              phone: true,
                        },
                  },
            },
            orderBy: {
                  datetime: "desc",
            },
      });

      return records;
};
