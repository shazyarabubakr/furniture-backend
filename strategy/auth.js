import passport from "passport";
import { Strategy as localStrategy } from "passport-local";
import Users from "../models/userModel.js";

// ...

passport.use(
  "signup",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const user = await Users.create({
          email,
          password,
          username: req.body.username,
        });
        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);
// ...

passport.use(
  "login",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await Users.findOne({ email });

        if (!user) {
          return done(null, false, { message: "User not found" });
        }

        const validate = await user.isValidPassword(password);

        if (!validate) {
          return done(null, false, { message: "invalid credentials!" });
        }

        return done(null, user, { message: "loggen in successfully!" });
      } catch (error) {
        return done(error);
      }
    }
  )
);
