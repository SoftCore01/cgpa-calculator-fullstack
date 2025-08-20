import { useAtom } from "jotai";
import { BASEURL } from "../utils/Contants";
import { endPoint } from "../utils/endPoints";
import { activeSemesterAtom, semestersAtom, systemAtom, usernameAtom } from "../store/atoms";
import type { readSemesterResponse } from "../utils/types";
import { useEffect } from "react";
import CourseList from "../components/coursesComponents/CourseList";
import GradeDisplay from "../components/GPComponents/GradeDisplay";
import Semesters from "../components/semestersComponents/Semesters";
import Button from "../components/Button";
import { toast } from "sonner";

const signoutUrl = BASEURL + endPoint.auth.signout;
const readSemesterUrl = BASEURL + endPoint.semesters;

export default function HomePage() {
  const [username] = useAtom(usernameAtom);
  const [, setSemesters] = useAtom(semestersAtom);
  const [, setActiveSemester] = useAtom(activeSemesterAtom)
  const [, setSystem] = useAtom(systemAtom)

  const handleSignout = async () => {
    try {
      const response = await fetch(signoutUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      toast.success('Signout successful')
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetSemesters = async () => {
    try {
      const response = await fetch(readSemesterUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const semestersData: readSemesterResponse = await response.json();

      if (semestersData.success) {
        setSemesters(semestersData.semesters);
        setActiveSemester(semestersData.activeSemester)
        setSystem(semestersData.system)
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetSemesters();
  }, []);
  return (
    <>
      <h1 className="text-center">{username}</h1>
      <Button onClick={handleSignout}>Signout</Button>
      <GradeDisplay />
      <div className="relative">
        <CourseList />
        <div className="sm:absolute sm:top-4">
          <Semesters />
        </div>
      </div>
    </>
  );
}
