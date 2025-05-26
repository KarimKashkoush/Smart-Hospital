"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.weekDaysObject = exports.weekDaysArray = void 0;
exports.weekDaysArray = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];
const weekDaysObject = {};
exports.weekDaysObject = weekDaysObject;
for (const dayIndex in exports.weekDaysArray) {
    weekDaysObject[exports.weekDaysArray[dayIndex]] = dayIndex;
}
//# sourceMappingURL=week-days.js.map