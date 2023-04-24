import Users from "../models/user.model.js";
import passport from "passport";
import jwt from "jsonwebtoken";
import { tryCatch } from "../utils/tryCatch.js";


export const signup = async (req, res, next) => {
  try {
    res.json({
      status: "success",
      data: req.user,
    });
  } catch (err) {
    next(err);
    // res.status(500).json({ status: "error", data: err });
  }
};

export const getUser = async (req, res, next) => {
  try {
    const users = await Users.find().populate("productId", "name");

    res.json({ status: "success", results: users.length, data: users });
  } catch (err) {
    next(err);
    // res.status(400).json({ status: "error", data: err });
  }
};

export const getCurrentUser = tryCatch(async (req, res, next) => {
  const user = await Users.findById(req.user.sub);
  tryCatch(res.json({ status: "success", data: user }));
  // try {
  //   const user = await Users.findById(req.user.sub);
  //   res.json({ status: "success", data: { user } });
  // } catch (err) {
  //   // console.log(err);
  //   next(err);
  //   // res.status(400).json({ status: "error", data: err });
  // }
});

export const login = async (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (err || !user) {
        // const error = new Error("no user found");
        // next(error);
        // return;
        throw new CustomError("no user found", 404, "5000");
      }

      req.login(user, { session: false }, async (error) => {
        if (error) {
          return next(error);
        }
        const body = { sub: user._id, email: user.email };
        const token = jwt.sign({ user: body }, process.env.JWT_SECRET, {
          expiresIn: "7 days",
        });

        res.json({ token });
      });
    } catch (err) {
      next(err);
    }
  })(req, res, next);
};
