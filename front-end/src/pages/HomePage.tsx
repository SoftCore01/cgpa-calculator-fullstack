import { useAtom } from "jotai";
import { BASEURL } from "../utils/Contants";
import { endPoint } from "../utils/endPoints";
import {
  semestersAtom,
  usernameAtom,
} from "../store/atoms";
import type { readSemesterResponse } from "../utils/types";

import { useEffect } from "react";
import Semester from "../components/Semester";
import GradeDisplay from "../components/GPComponents/GradeDisplay";


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
      <button onClick={handleSignout}>Signout</button>
      <button onClick={handleGetSemesters}>Get data</button>
      <GradeDisplay />
      <Semester />
    </>
  );
}
