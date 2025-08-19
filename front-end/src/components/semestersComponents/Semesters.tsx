import { useAtom } from "jotai";
import { semestersAtom } from "../../store/atoms";
import SemesterButton from "./SemesterButton";
import type {  Semester } from "../../utils/types";
import Button from "../Button";

export default function Semesters() {
    const [semesters, setSemesters] = useAtom(semestersAtom);
    const handleAddSemester = () => {
        const newSemesters = [...semesters]
        const newCourses: Semester = [{name: '',grade: 'A', unit:0}]
        newSemesters.push(newCourses);
        setSemesters(newSemesters)
    }
  return (
    <>
      <div className="flex justify-center mb-5 items-center gap-2 flex-col">
        <Button className="w-20" onClick={handleAddSemester}>
          Add
        </Button>
        <div className="flex gap-2 justify-center flex-wrap sm:flex-col">
          {semesters.map((_semester, idx) => (
            <SemesterButton key={idx} index={idx} />
          ))}
        </div>
      </div>
    </>
  );
}
