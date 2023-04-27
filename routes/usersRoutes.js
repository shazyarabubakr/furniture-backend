import { Router } from "express";
import { getUser } from "../controller/userController.js";
import passport from "passport";
// import { loginMiddleware } from "../middlewares/authent.middleware.js";
const router = Router();

router.route("/").get(getUser);
router.post(
  "/signup",
  passport.authenticate("signup", { session: false }),
  async (req, res, next) => {
    res.json({
      message: "Signup successful",
      user: req.user,
    });
  }
);
// router.route("/login").post(loginMiddleware);

export default router;
