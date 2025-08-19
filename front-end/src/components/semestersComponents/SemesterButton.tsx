import { useAtom } from "jotai";
import clsx from "clsx";
import { activeSemesterAtom, semestersAtom } from "../../store/atoms";
import type { Course } from "../../utils/types";
import Button from "../Button";

export default function SemesterButton({ index }: { index: number }) {
  const [activeSemester, setActiveSemester] = useAtom(activeSemesterAtom);
  const [semesters, setSemesters] = useAtom(semestersAtom);
  
  const handleClick = () => {
    console.log("clicking");
    console.log(activeSemester);
    setActiveSemester(index);
  };

  const handleDelete = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    e.stopPropagation();
    const newSemesters = [...semesters];
    if (newSemesters.length == 1) {
      const newCourses: Course[] = [];
      newCourses.push({ name: "", grade: "A", unit: 0 });
      newSemesters.splice(activeSemester, 1, newCourses);
      setSemesters(newSemesters);
    } else {
      newSemesters.splice(activeSemester, 1);
      if (activeSemester === 0) {
        setActiveSemester(0);
      } else {
        setActiveSemester(activeSemester - 1);
      }
      setSemesters(newSemesters);
    }
  };
  return (
    <>
      <Button
        className={clsx(
          index == activeSemester ? "border-2 border-[#646cff]" : "",
          `flex items-center justify-between gap-2 bg-[#1a1a1a] pl-2 pr-1 w-14 h-8 rounded-sm hover:border-2 hover:border-[#646cff]`
        )}
        onClick={handleClick}
      >
        <span>{index + 1}</span>
        <img
          className="w-4 h-4 trash"
          onClick={handleDelete}
          src="./trash.svg"
          alt="trash-icon"
        />
      </Button>
    </>
  );
}
