import { Request, Response } from "express";
import { signinSchema, signupSchema } from "../middlewares/validator.js";
import db from "../utils/db.js";

export const signUpController = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  try {
    const { error, value } = signupSchema.validate({
      username,
      email,
      password,
    });
    if (error) {
      console.log(error.details[0].message);
      return res
        .status(401)
        .json({ success: false, message: error.details[0].message });
    }
    //Update this when connecting to mongodb
    const existingUser = db.find((user) => user.email === email);
    if (existingUser)
      return res
        .status(401)
        .json({ success: false, message: "User already exists" });

    db.push({ username, email, password });
    return res
      .status(201)
      .json({ success: true, message: "User created successfully" });
  } catch (error) {
    console.log(error);
  }
};

export const signinController = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const { error, value } = signinSchema.validate({
      email,
      password,
    });
    if (error)
      return res
        .status(401)
        .json({ success: false, message: error.details[0].message });

    const existingUser = db.find((user) => user.email == email);

    if (!existingUser)
      return res
        .status(401)
        .json({ success: "false", message: "User does not exist" });
    if (existingUser.password !== password)
      return res
        .status(401)
        .json({ success: false, message: "Incorrect password" });

    req.session.user = existingUser;
    return res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
  }
};

export const signOutController = async (req: Request, res: Response) => {
  if (req.session.user) {
    req.session.destroy((err) => {
      if (err) throw new Error(err);
    });
    return res
      .clearCookie(process.env.COOKIE_NAME)
      .json({ success: true, message: "Signout Successful" });
    }
    return res.status(400).json({success: false, message: 'Bad Request'})
};
