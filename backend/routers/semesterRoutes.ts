import { Router } from "express";
import { /* deleteSemestersController, */ readSemestersController, updateSemestersController } from "../controllers/semesterControllers.js";

const router = Router();

router.get("/semesters", readSemestersController);

/* router.delete("/semesters", deleteSemestersController); */
router.patch('/semesters', updateSemestersController)
export default router;
