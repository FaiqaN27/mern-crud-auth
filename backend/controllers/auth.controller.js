import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs';


export const handleSignup = async (req, res) => {
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
  catch (e) {
    res.status(500).json(e.message)
  }

}