import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const handleSignup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);

  if (!username || !email || !password) {
    return res.status(400).json({ error: "All Fields are required" });
  }

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    next(error);
  }
};

export const handleSignin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User not found"));

    //comparing password
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Invalid Credentials"));

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: hashedPassword, ...rest } = validUser._doc;

    //expiry date - 1 hour
    const expiryDate = new Date(Date.now() + 3600000);

    //pass here expiry
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        expires: expiryDate,
      })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const handleGoogleAuth = async (req, res, next) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });
    if (user) {
      //create token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

      //remove password from user obj
      const { password: hashedPassword, ...rest } = user._doc;

      //create expiry date
      const expiryDate = new Date(Date.now() + 3600000);

      // storing token in cookies
      res
        .cookie("token", token, { httpOnly: true, expires: expiryDate })
        .status(200)
        .json(rest);
    } else {
      //random password for users login with google
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);

      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

      //creating new user
      const newUser = new User({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.floor(Math.random() * 1000).toString(),
        email: req.body.email,
        password: hashedPassword,
        profilePicture: req.body.photo,
      });
      await newUser.save();

      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: hashedPassword2, ...rest } = newUser._doc;
      const expiryDate = new Date(Date.now() + 3600000);

      res
        .cookie("token", token, {
          httpOnly: true,
          expires: expiryDate,
        })
        .status(201)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

export const handleSignout = (req, res) => {
  res.clearCookie("token").status(200).json("Signout Success");
};
