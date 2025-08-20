import { Request, Response } from "express";
import { semestersSchema } from "../middlewares/validator.js";
import { User } from "../models/usersModel.js";
import { Semester } from "../types/types.js";



export const readSemestersController = async (req: Request, res: Response) => {
  const user = req.session.user;
  if (user) {
    /* const user = req.session.user; */
    const existingUser = await User.findOne({email: user});
    if (existingUser) {
      return res.json({
        success: true,
        message: "Semesters retrieved successfully",
        data: existingUser.semesters,
      });
    } 
  }
  return res.status(401).json({ success: false, message: "Unauthorized" });
};

export const deleteSemestersController = async (
  req: Request,
  res: Response
) => {
  const user = req.session.user;
  if (user) {
    /* const user = req.session.user; */
    const existingUser = await User.findOne({email: user});
    if (existingUser) {
      const newSemester:Semester[] = []
      existingUser.semesters = [];
      return res.json({
        success: true,
        message: "Semesters deleted successfully",
      });
    } 
  }
  return res.status(401).json({ success: false, message: "Unauthorized" });
};

export const updateSemestersController = async (
  req: Request,
  res: Response
) => {
  const user = req.session.user;
  if (user) {
    const { semesters } = req.body;
    const { error, value } = semestersSchema.validate({
      semesters,
    });
    /* console.log(semesters) */
    if (error)
      return (
        res
          /*         .status(401) */
          .json({ success: false, message: error.details[0].message })
      );
    const existingUser = await User.findOne({ email: user });
    if (existingUser) {
      existingUser.semesters = semesters;
      await existingUser.save()
      return res.json({
        success: true,
        message: "Semesters deleted successfully",
      });
    }
  }
  return res.status(401).json({ success: false, message: "Unauthorized" });
};
