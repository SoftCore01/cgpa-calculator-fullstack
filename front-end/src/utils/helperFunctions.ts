import type { Course, Grade, Semester } from "./types";

export function calculateGPA(semester: Semester, system: number) {
  const totalPoints = semester?.reduce((acc: number, course: Course) => {
    const gradeValue = gradeToValueConversion(system, course.grade);
    return acc + gradeValue * course.unit;
  }, 0);

  const totalUnits = semester?.reduce(
    (acc: number, course: Course) => acc + course.unit,
    0
  );
  return parseFloat((totalPoints / totalUnits).toFixed(2));
}

export function calculateCGPA(semesters: Semester[], system: number) {
  const allCourses = semesters?.reduce(
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

export function isGrade(value: string) {
  const grades = ['A', 'B', 'C', 'D', 'E', 'F']
  for (let i = 0; i < grades.length; i++) {
    if (grades[i] == value) {
      return true
    }
  }
  return false
}


