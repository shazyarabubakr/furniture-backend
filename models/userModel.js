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
    required: true,
    match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
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
