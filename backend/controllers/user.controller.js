import { errorHandler } from "../utils/error.js"
import bcryptjs from "bcryptjs"
import User from '../models/user.model.js';

export const handleTestApi = (req, res) => {
  res.json({
    message: 'API is working'
  })
}

export const handleUpdateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "You can update only your account"));
  }
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    const updatedUser = await User.findByIdAndUpdate(req.params.id, {
      $set: {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        profilePicture: req.body.profilePicture
      },
    },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  }
  catch (error) {
    next(error);
  }
}

export const handleDeleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "You can delete only your account"));
  }
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    res.status(200).json('User has been deleted successfully! ');
  }
  catch (error) {
    next(error);
  }
}