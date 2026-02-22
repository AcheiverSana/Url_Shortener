const jwt = require("jsonwebtoken");

const SECRET = process.env.JWT_SECRET;

function createToken(user) {
  return jwt.sign(
    { id: user._id, role: user.role },
    SECRET,
    { expiresIn: "7d" }
  );
}

function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET);
  } catch (err) {
    return null;
  }
}

module.exports = { createToken, verifyToken };