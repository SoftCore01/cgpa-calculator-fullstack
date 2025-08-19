import { useMemo } from "react";
import { calculateCGPA, calculateGPA } from "../../utils/helperFunctions";
import Progressbar from "./ProgressBar";
import { useAtom } from "jotai";
import {
  activeSemesterAtom,
  semestersAtom,
  systemAtom,
} from "../../store/atoms";
import System from "../System";

export default function GradeDisplay() {
  const [semesters] = useAtom(semestersAtom);
  const [system] = useAtom(systemAtom);
  const [activeSemester] = useAtom(activeSemesterAtom);
  const cgpa = useMemo(() => {
    return isNaN(calculateCGPA(semesters, system))
      ? 0
      : calculateCGPA(semesters, system);
  }, [semesters, system]);
  const gpa = useMemo(() => {
    return isNaN(calculateGPA(semesters[activeSemester], system))
      ? 0
      : calculateGPA(semesters[activeSemester], system);
  }, [semesters, activeSemester, system]);

  return (
    <div className="px-2 mt-5 flex flex-col items-center gap-3.5 justify-center relative sm:flex-row">
      <div className="sm:absolute sm:top-0 sm:z-50">
        <System />
      </div>

      <Progressbar textInfo="CGPA" value={cgpa} />
      <Progressbar textInfo="GPA" value={gpa} />
    </div>
  );
}
