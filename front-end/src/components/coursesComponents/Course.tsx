/* import Grade from "./Grade"; */

import { useAtom } from "jotai";
import GradeComponent from "./Grade";
import {
  activeSemesterAtom,
  semestersAtom,
  systemAtom,
} from "../../store/atoms";
import { useRef } from "react";
import { type Grade } from "../../utils/types";


type CourseProps = {
  inputValue?: string;
  gradeValue?: Grade;
  unitValue?: number;
  index: number;
};

export default function Course({
  inputValue,
  gradeValue,
  unitValue,
  index,
}: CourseProps) {
  const [system] = useAtom(systemAtom);
  const [semesters, setSemesters] = useAtom(semestersAtom);
  const [activeSemester] = useAtom(activeSemesterAtom);
  const courseRef = useRef<HTMLDivElement | null>(null);
  
  const handleDeleteCourse = () => {
    const numberOfCourses = semesters[activeSemester].length;
    if (courseRef.current && numberOfCourses > 1) {
      courseRef.current.remove();
    }
  };

  const handleChange = (value: string, property: string) => {
    const newSemesters = [...semesters];
    const newCourses = [...semesters[activeSemester]];
    const course = newCourses[index];
    if (property == "unit") {
      course.unit = parseInt(value);
    } else if (property == "grade") {
      if (
        value == "A" ||
        value == "B" ||
        value == "C" ||
        value == "D" ||
        value == "E" ||
        value == "F"
      ) {
        course.grade = value;
      }
    } else {
      course.name = value;
    }
    newCourses.splice(index, 1, course);
    newSemesters.splice(activeSemester, 1, newCourses);
    setSemesters(newSemesters)
  };
  return (
    <>
      <div ref={courseRef} className="py-2 flex items-center justify-between w-full sm:w-3/4 lg:w-1/2">
        <input
          className="px-2 py-0.5 rounded-xl"
          type="text"
          name="course"
          value={inputValue}
          placeholder="EEE101"
          onChange={(e) => handleChange(e.target.value, "name")}
        />
        <GradeComponent
          className="hover:outline-[#646cff] hover:outline-1"
          system={system}
          value={gradeValue}
          onChange={(e) => handleChange(e.target.value, "grade")}
        />
        <input
          type="number"
          name="unit"
          min={0}
          max={system}
          value={unitValue}
          onChange={(e) => handleChange(e.target.value, "unit")}
          className="ml-3 w-6"
        />
        <img onClick={handleDeleteCourse} className="w-4 h-4 trash" src="./trash.svg" alt="trash-icon" />
      </div>
    </>
  );
}
