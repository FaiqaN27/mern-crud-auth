import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const handleSignup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);

  if (!username || !email || !password) {
    return res.status(400).json({ error: "All Fields are required" });
  }

  const newUser = new User({
    username, email, password: hashedPassword
  });

  try {
    await newUser.save();
    return res.status(201).json({ message: "User created successfully" });
  }
  catch (error) {
    next(error);
  }
}

export const handleSignin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, 'User not found'));

    //comparing password 
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, 'Invalid Credentials'));

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: hashedPassword, ...rest } = validUser._doc;

    //expiry date - 1 hour
    const expiryDate = new Date(Date.now() + 3600000);

    //pass here expiry 
    res
      .cookie('token', token, { httpOnly: true }, expiryDate)
      .status(200)
      .json(rest);
  }
  catch (error) {
    next(error);
  }
}