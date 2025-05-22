export const weekDaysArray = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const weekDaysObject = {};

for (const dayIndex in weekDaysArray) {
  weekDaysObject[weekDaysArray[dayIndex]] = dayIndex;
}

export { weekDaysObject };
