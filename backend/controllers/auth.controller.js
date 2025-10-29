// auth.controller.js
const signup = async (req, res) => {
  console.log(req.body);  // logs incoming data
  res.json({ message: 'Signup route hit', data: req.body });
};

module.exports = { signup };

import User from '../models/user.model.js'; // 💡 Make sure this path is correct
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js'; // 💡 Assumes you have an error handler utility
import jwt from 'jsonwebtoken';

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === '' || password === '') {
    return next(errorHandler(400, 'All fields are required'));
  }

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, 'User not found'));
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, 'Invalid password'));
    }

    // Create JWT token
    const token = jwt.sign(
      { id: validUser._id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' } // Token expires in 1 day
    );

    // Separate password from the rest of the user details
    const { password: userPassword, ...rest } = validUser._doc;

    // Send the token in a cookie and the user info in JSON
    res
      .status(200)
      .cookie('access_token', token, {
        httpOnly: true, // Cookie cannot be accessed by client-side scripts
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};