import passport from "passport";
import UserModel from "../models/user.model.js";

export const signUpMiddleware = passport.authenticate("signup", {
  session: false,
});

export const protect = passport.authenticate("jwt", { session: false });

export const checkRole = (role) => {
  return async (req, res, next) => {
    try {
      const user = await UserModel.findById(req.user.sub);

      if (!user || user.role !== role) {
        return res.status(401).json("not authorized");
        // throw new CustomError("not user fount", 404, "5000");
      }
      next();
    } catch (error) {
      res.status(400).json(error);
    }
  };
};
