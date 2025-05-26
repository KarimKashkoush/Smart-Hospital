import { Doctor } from "@prisma/client";
type WeekDay = "Saturday" | "Sunday" | "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday";
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
export declare const updateDoctor: (id: string, data: DoctorData) => Promise<Doctor>;
export {};
