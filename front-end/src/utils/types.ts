export type Course = {
  name: string;
  grade: Grade;
  unit: number;
};

export type Grade = "A" | "B" | "C" | "D" | "E" | "F";
export type Semester = Course[];
export type System = 5 | 4;

export interface ApiResponse {
  success: boolean;
  message: string;
}

export interface SigninResponse extends ApiResponse {
  data: string;
}
export interface readSemesterResponse extends ApiResponse {
  data: Semester[];
}
