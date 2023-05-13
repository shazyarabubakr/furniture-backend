import Users from "../models/userModel.js";
// import passport from "passport";
// import jwt from "jsonwebtoken";
import { tryCatch } from "../utils/tryCatch.js";
import {sendToken} from "../utils/jwtToken.js";

export const register = tryCatch(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await Users.create({
    name,
    email,
    password,
    avatar: {
      public_id: "this is a sample id",
      url: "profilePicUrl",
    },
  });
  const token = user.getJWTToken();
  res.status(201).json({
    success: true,
    token,
  });
  // res.status(500).json({ status: "error", data: err });
});
// Login User
export const loginUser = tryCatch(async (req, res) => {
  const { email, password } = req.body;

  // checking if user has given password and email both

  if (!email || !password) {
    throw new customError("Please Enter Email & Password", 400);
  }

  const user = await Users.findOne({ email }).select("+password");

  if (!user) {
    throw new customError("Invalid email or password", 401);
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    throw new customError("Invalid email or password", 401);
  }
  sendToken(user, 200, res);
});

// Logout User
export const logout = tryCatch(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

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

// export const login = async (req, res, next) => {
//   passport.authenticate("login", async (err, user, info) => {
//     try {
//       if (err || !user) {
//         // const error = new Error("no user found");
//         // next(error);
//         // return;
//         throw new CustomError("no user found", 404, "5000");
//       }

//       req.login(user, { session: false }, async (error) => {
//         if (error) {
//           return next(error);
//         }
//         const body = { sub: user._id, email: user.email };
//         const token = jwt.sign({ user: body }, process.env.JWT_SECRET, {
//           expiresIn: "7 days",
//         });

//         res.json({ token });
//       });
//     } catch (err) {
//       next(err);
//     }
//   })(req, res, next);
// };
