import { Router } from "express";
import { signupSchema } from "../middlewares/validator.js";
import db from "../utils/db.js";
const router = Router();
router.post("/auth/signup", (req, res) => {
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
    }
    catch (error) {
        console.log(error);
    }
});
/* router.post("/signin");

router.post("logout"); */
export default router;
