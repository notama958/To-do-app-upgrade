const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

module.exports = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ message: 'no token, authorization only' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);
    req.user = decoded.user; // return user object holding the id
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is invalid' });
  }
};
