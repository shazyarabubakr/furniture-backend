import mongoose from "mongoose";
import bcrypt from "bcrypt";

const usersSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please enter your email address"],
    match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minlength: [8, "Password should be greater than 8 characters"],
  },

  //   classId: [{ type: mongoose.Types.ObjectId, ref: "class", required: true }],
  //   studentId: [
  //     { type: mongoose.Types.ObjectId, ref: "student", required: true },
  //   ],
});
userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const user = mongoose.model("user", usersSchema);
export default user;
