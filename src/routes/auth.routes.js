import { Router } from "express";
const router = Router();
import * as authController from "../controllers/auth.controller.js";
import { checkDuplicateUsernameOrEmail } from "../middlewares/verifySignup.js";

//registrarse
router.post("/signup", checkDuplicateUsernameOrEmail, authController.signup);

//logearse
router.post("/signin", authController.sigin);

//destruir cookie
router.get("/logout", authController.cookieDestroy);

export default router;
