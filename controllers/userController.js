const asyncHandler = require('express-async-handler');

//@desc Register a user
//@route POSTS /api/users/register
//@access public

const registerUser = asyncHandler(async (req, res) => {
  res.status(201).json({ message: 'User registered successfully!' });
});

//@desc login a user
//@route POSTS /api/users/login
//@access public

const loginUser = asyncHandler(async (req, res) => {
  res.status(201).json({ message: 'User login successfully!' });
});

//@desc current a user info
//@route POSTS /api/users/current
//@access private

const currentUser = asyncHandler(async (req, res) => {
  res.status(201).json({ message: 'current user information' });
});

module.exports = { registerUser, loginUser, currentUser };
