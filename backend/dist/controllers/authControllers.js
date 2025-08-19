var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { signinSchema, signupSchema } from "../middlewares/validator.js";
import { User } from "../models/usersModel.js";
import { doHash, doHashValidation } from "../utils/hashing.js";
export const signUpController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    try {
        const { error, value } = signupSchema.validate({
            username,
            email,
            password,
        });
        if (error) {
            console.log(error.details[0].message);
            return (res
                .json({ success: false, message: error.details[0].message }));
        }
        //Update this when connecting to mongodb
        /* const existingUser = db.find((user) => user.email === email) */
        const existingUser = yield User.findOne({ email });
        if (existingUser)
            return (res
                .json({ success: false, message: "User already exists" }));
        const hashedPassword = yield doHash(password, 12);
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            semesters: [[{ name: '', grade: 'A', unit: 0 }]]
        });
        yield newUser.save();
        return res
            .status(201)
            .json({ success: true, message: "User created successfully" });
    }
    catch (error) {
        console.log(error);
    }
});
export const signinController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const { error, value } = signinSchema.validate({
            email,
            password,
        });
        if (error)
            return (res
                .json({ success: false, message: error.details[0].message }));
        const existingUser = yield User.findOne({ email }).select("+password");
        if (!existingUser)
            return res.json({ success: false, message: "User does not exist" });
        const isCorrectPassword = yield doHashValidation(password, existingUser.password);
        if (!isCorrectPassword)
            return (res
                .send({ success: false, message: "Incorrect password" }));
        req.session.user = existingUser;
        console.log(req.session.user);
        return (res
            .status(200)
            .json({
            success: true,
            message: "Signin successful",
            data: existingUser.username,
        }));
    }
    catch (error) {
        console.log(error);
    }
});
export const signOutController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.session.user) {
        req.session.destroy((err) => {
            if (err)
                throw new Error(err);
        });
        return res
            .clearCookie(`${process.env.COOKIE_NAME}`)
            .json({ success: true, message: "Signout Successful" });
    }
    return res.status(400).json({ success: false, message: "Bad Request" });
});
