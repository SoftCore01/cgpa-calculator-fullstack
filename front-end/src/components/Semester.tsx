import { useAtom } from "jotai";
import CourseComponent from "../components/coursesComponents/Course";
import { activeSemesterAtom, semestersAtom } from "../store/atoms";
import type { ApiResponse, Course } from "../utils/types";
import { BASEURL } from "../utils/Contants";
import { endPoint } from "../utils/endPoints";

const saveSemestersUrl = BASEURL + endPoint.semesters;

export default function Semester() {
  const [semesters, setSemesters] = useAtom(semestersAtom);
  const [activeSemester] = useAtom(activeSemesterAtom);

  const handleAddCourse = () => {
    const newCourse = [...semesters[activeSemester]];
    const newSemesters = [...semesters];
    newCourse.push({
      name: "",
      grade: "A",
      unit: 0,
    });
    newSemesters.splice(activeSemester, 1, newCourse);
    setSemesters(newSemesters);
  };

  const handleRemoveAll = () => {
    const newSemesters = [...semesters];
    const newCourses: Course[] = [];
    newCourses.push({ name: "", grade: "A", unit: 0 });
    newSemesters.splice(activeSemester, 1, newCourses);
    setSemesters(newSemesters);
  };

  const handleSaveSemester = async () => {
    try {
      const response = await fetch(saveSemestersUrl, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ semesters: semesters }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const apiResponse: ApiResponse = await response.json();
      if (!apiResponse.success) {
        throw new Error(`HTTP error! Status: ${apiResponse.message}`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="flex flex-col items-center ">
        {semesters[0]?.map((semester, index) => (
          <CourseComponent
            key={index}
            index={index}
            inputValue={semester.name}
            gradeValue={semester.grade}
            unitValue={semester.unit}
          />
        ))}
      </div>
      <div className="flex justify-center gap-3 my-10">
        <button onClick={handleAddCourse}>Add Course</button>
        <button onClick={handleRemoveAll}>Remove All</button>
        <button onClick={handleSaveSemester}>Save</button>
      </div>
    </>
  );
}
