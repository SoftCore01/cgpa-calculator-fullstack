import mongoose from "mongoose";
import { Course } from "./courseModel.js";
const courseSchema = new mongoose.Schema({
    name: [[Course]]
});
export const Semester = mongoose.model('Semester', courseSchema);
