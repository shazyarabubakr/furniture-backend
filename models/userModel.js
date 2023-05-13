import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
//bcrypt bo gorini shewazy password aka
const usersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Your Name"],
    maxLength: [30, "Name cannot exceed 30 characters"],
    minLength: [4, "Name should have more than 4 characters"],
  },
  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true,
    match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  },
  password: {
    type: String,
    required: [true, "Please Enter Your Password"],
    minLength: [8, "Password should be greater than 8 characters"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

  resetPasswordToken: String,
  resetPasswordExpire: Date,

  //   classId: [{ type: mongoose.Types.ObjectId, ref: "class", required: true }],
  //   studentId: [
  //     { type: mongoose.Types.ObjectId, ref: "student", required: true },
  //   ],
});
usersSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// JWT TOKEN
//jwt secret can create multiple admin fake acc
usersSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.TOP_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};


// Compare Password

usersSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
usersSchema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const user = mongoose.model("User", usersSchema);
export default user;
