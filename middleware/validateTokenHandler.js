const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  const authHeader = req.headers.Authorization || req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.status(401);
        throw new Error('User is not authorized');
      }

      req.user = decoded.user; // decoded-დან მომხმარებლის მონაცემების შენახვა

      next(); // აუცილებლად უნდა გამოძახო!
    });

    // If no token is provided, send a 401 error
    if (!token) {
      res.status(401);
      throw new Error('No token provided');
    }
  } else {
    res.status(401);
    throw new Error('No token provided or token format is incorrect');
  }
});

module.exports = validateToken;
