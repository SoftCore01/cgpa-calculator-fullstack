import type { Course, Grade, Semester } from "./types";

export function calculateGPA(semester: Semester, system: number) {
  const totalPoints = semester.reduce((acc: number, course: Course) => {
    const gradeValue = gradeToValueConversion(system, course.grade);
    return acc + gradeValue * course.unit;
  }, 0);

  const totalUnits = semester.reduce(
    (acc: number, course: Course) => acc + course.unit,
    0
  );
  return (totalPoints / totalUnits).toFixed(2);
}

export function calculateCGPA(semesters: Semester[], system: number) {
  const allCourses = semesters.reduce(
    (acc: Semester, semester: Semester) => acc.concat(semester),
    []
  );
  return calculateGPA(allCourses, system);
}

function gradeToValueConversion(system: number, grade: Grade) {
  if (system === 4) {
    switch (grade) {
      case "A":
        return 4;
      case "B":
        return 3;
      case "C":
        return 2;
      case "D":
        return 1;
      default:
        return 0;
    }
  }
  switch (grade) {
    case "A":
      return 5;
    case "B":
      return 4;
    case "C":
      return 3;
    case "D":
      return 2;
    case "E":
      return 1;
    default:
      return 0;
  }
}

const semester: Semester[] = [
  [
    { name: "Ore", grade: "A", unit: 3 },
    { name: "Ore", grade: "A", unit: 2 },
    { name: "Ore", grade: "A", unit: 0 },
    { name: "Ore", grade: "A", unit: 3 },
  ],
  [
    { name: "Ore", grade: "A", unit: 3 },
    { name: "Ore", grade: "C", unit: 2 },
    { name: "Ore", grade: "A", unit: 0 },
    { name: "Ore", grade: "D", unit: 3 },
  ],
  [
    { name: "Ore", grade: "A", unit: 3 },
    { name: "Ore", grade: "F", unit: 2 },
    { name: "Ore", grade: "A", unit: 0 },
    { name: "Ore", grade: "C", unit: 3 },
  ],
];

console.log(calculateCGPA(semester, 4));
