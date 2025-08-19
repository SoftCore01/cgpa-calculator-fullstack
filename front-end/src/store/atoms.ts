import type { Semester, System } from "../utils/types";
import { atomWithStorage } from "jotai/utils";

export const usernameAtom = atomWithStorage("username", '');
export const activeSemesterAtom = atomWithStorage('activeSemester',0);
export const systemAtom = atomWithStorage<System>('system', 5);
export const semestersAtom = atomWithStorage<Semester[]>('semesters',[]);
