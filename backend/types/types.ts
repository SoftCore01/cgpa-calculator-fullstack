export type User = {
  username: string;
  email: string;
  password: string;
  semesters: Semester[];
  activeSemester: number;
  system: number
};

export type UserSession = string

export type Grade = "A" | "B" | "C" | "D" | "E" | "F";
export type Course = {
  name: string;
  grade: Grade;
  unit: number;
};

export type Semester = Course[];
