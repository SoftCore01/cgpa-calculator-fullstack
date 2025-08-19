import { useAtom } from "jotai";
import { BASEURL } from "../utils/Contants";
import { endPoint } from "../utils/endPoints";
import { semestersAtom, usernameAtom } from "../store/atoms";
import type { readSemesterResponse } from "../utils/types";

import { useEffect } from "react";
import CourseList from "../components/coursesComponents/CourseList";
import GradeDisplay from "../components/GPComponents/GradeDisplay";
import Semesters from "../components/semestersComponents/Semesters";
import Button from "../components/Button";

const signoutUrl = BASEURL + endPoint.auth.signout;
const readSemesterUrl = BASEURL + endPoint.semesters;

export default function HomePage() {
  const [username] = useAtom(usernameAtom);
  const [, setSemesters] = useAtom(semestersAtom);

  const handleSignout = async () => {
    try {
      const response = await fetch(signoutUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
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
        setSemesters(semestersData.data);
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
