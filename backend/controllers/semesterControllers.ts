import { Request, Response } from "express";
import db from "../utils/db.js";
import { semestersSchema } from "../middlewares/validator.js";


export const readSemestersController = async (req: Request, res: Response) => {
  if (req.session.user) {
    /* const user = req.session.user; */
    console.log("read");
    const existingUser = db.find(
      (user) => user.email === req.session.user.email
    );
    if (existingUser) {
      return res.json({
        success: true,
        message: "Semesters retrieved successfully",
        data: existingUser.sesmesters,
      });
    }
  }
  return res.status(401).json({ success: false, message: "Unauthorized" });
};

export const deleteSemestersController = async (
  req: Request,
  res: Response
) => {
  if (req.session.user) {
    /* const user = req.session.user; */
    const userIndex = db.findIndex(
      (user) => user.email === req.session.user.email
    );
    const newUser = db[userIndex];
    newUser.sesmesters = [];
    req.session.user = newUser;
    db.splice(userIndex, 1, newUser);

    return res.json({
      success: true,
      message: "Semesters deleted successfully",
    });
  }
  return res.status(401).json({ success: false, message: "Unauthorized" });
};

export const updateSemestersController = async (
  req: Request,
  res: Response
) => {
  if (req.session.user) {
    const { semesters } = req.body;
    const { error, value } = semestersSchema.validate({
      semesters,
    });
    if (error)
      return (
        res
          /*         .status(401) */
          .json({ success: false, message: error.details[0].message })
      );
    const userIndex = db.findIndex(
      (user) => user.email === req.session.user.email
    );
    const newUser = db[userIndex];
    newUser.sesmesters = semesters;
    req.session.user = newUser;
    db.splice(userIndex, 1, newUser);
    return res.json({
      success: true,
      message: "Semesters updated successfully",
    });
  }
  return res.status(401).json({ success: false, message: "Unauthorized" });
};
