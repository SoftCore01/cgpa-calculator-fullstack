import { Request, Response } from "express";
import { signinSchema, signupSchema } from "../middlewares/validator.js";
import { User } from "../models/usersModel.js";
import { doHash, doHashValidation } from "../utils/hashing.js";

export const signUpController = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  try {
    const { error, value } = signupSchema.validate({
      username,
      email,
      password,
    });
    if (error) {
      return (
        res
          .json({ success: false, message: error.details[0].message })
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return (
        res
          .json({ success: false, message: "User already exists" })
      );

    const hashedPassword = await doHash(password, 12);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      semesters: [[{ name: '', grade: 'A', unit: 0 }]],
      activeSemester: 0,
      system: 5
    })
    await newUser.save();
    
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
      return (
        res
          .json({ success: false, message: error.details[0].message })
      );

    const existingUser = await User.findOne({email}).select("+password");

    if (!existingUser)
      return res.json({ success: false, message: "User does not exist" });

    const isCorrectPassword = await doHashValidation(password, existingUser.password);
    if (!isCorrectPassword)
      return (
        res
          .send({ success: false, message: "Incorrect password" })
      );

    req.session.user = existingUser.email
    return (
      res
        .json({
          success: true,
          message: "Signin successful",
          data: existingUser.username,
        })
    );
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
      .clearCookie(`${process.env.COOKIE_NAME}`)
      .json({ success: true, message: "Signout Successful" });
  }
  return res.status(400).json({ success: false, message: "Bad Request" });
};
