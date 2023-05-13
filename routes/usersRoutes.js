import { Router } from "express";
import { loginUser, register } from "../controller/userController.js";
// import passport from "passport";
// import { loginMiddleware } from "../middlewares/authent.middleware.js";
const router = Router();

router.route("/register").post(register);
router.route("/login").post(loginUser);

export default router;
