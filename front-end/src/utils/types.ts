export type Course = {
  name: string;
  grade: Grade;
  unit: number;
};

export type Grade = "A" | "B" | "C" | "D" | "E" | "F";
export type Semester = Course[];

export type ApiResponse = {
  success: boolean;
  message: string;
};
