import User from "../models/userModel.js";
import { tryCatch } from "../utils/tryCatch.js";
import jwt from "jsonwebtoken";

export const isAuthenticatedUser = tryCatch(async (req, res, next) => {
  const { token } = req.cookies;
  // console.log(token)
  if (!token) {
    throw new CustomError("Please Login to access this resource", 401);
  }

  const decodedData = jwt.verify(token, process.env.TOP_SECRET);

  req.user = await User.findById(decodedData.id);

  next();
});
