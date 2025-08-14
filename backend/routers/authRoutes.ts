import { Router } from "express";
import { signUpController, signinController, signOutController } from "../controllers/authControllers.js";


const router = Router();

router.post("/auth/signup", signUpController);

router.post("/auth/signin", signinController);

router.get('/auth/signout', signOutController);

/* router.post("logout"); */

export default router;
