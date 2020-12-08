const jwt = require('jsonwebtoken');
const dotent = require('dotenv');
const { restart } = require('nodemon');

dotent.config();

//middleware to validate token
const verifyToken = (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) return res.status(401).json({ error: 'Access denied' });

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ error: 'Token is not valid' });
  }
};

module.exports = verifyToken;
