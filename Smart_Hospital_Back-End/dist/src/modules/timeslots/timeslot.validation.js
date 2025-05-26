"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTimeSlotSchema = exports.createTimeSlotSchema = void 0;
const zod_1 = require("zod");
exports.createTimeSlotSchema = zod_1.z.object({
    dayOfWeek: zod_1.z.enum(["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]),
    startTime: zod_1.z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/),
    endTime: zod_1.z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/),
    shift: zod_1.z.enum(["Morning", "Evening"]),
});
exports.updateTimeSlotSchema = zod_1.z.object({
    dayOfWeek: zod_1.z.enum(["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]).optional(),
    startTime: zod_1.z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/).optional(),
    endTime: zod_1.z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/).optional(),
    shift: zod_1.z.enum(["Morning", "Evening"]).optional(),
});
//# sourceMappingURL=timeslot.validation.js.map