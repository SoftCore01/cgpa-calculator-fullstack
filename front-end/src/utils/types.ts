export type Course = {
  name: string;
  grade: Grade;
  unit: number;
};

export type Grade = "A" | "B" | "C" | "D" | "E" | "F";
export type Semester = Course[];
export type System = number;

export interface ApiResponse {
  success: boolean;
  message: string;
}

export interface SigninResponse extends ApiResponse {
  data: string;
}
export interface readSemesterResponse extends ApiResponse {
  semesters: Semester[];
  activeSemester: number;
  system: System
}
