import { db } from "src";

export const getAllPatients = async () => {
      const patients = await db.patient.findMany({
            include: {
                  user: {
                        select: {
                              username: true,
                              image: true,
                        },
                  },
            },
      });

      return patients.map((patient) => ({
            ...patient,
            username: patient.user.username,
            avatar: patient.user.image,
      }));
};
