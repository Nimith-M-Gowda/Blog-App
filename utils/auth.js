const User = require("../models/user");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "Nimith$";

async function generateToken(id) {
  const user = await User.findById(id);
  const payload = {
    _id: user._id,
    email: user.email,
    fullName: user.fullName,
  };

  const token = jwt.sign(payload, JWT_SECRET);
  return token;
}

function validateToken(token) {
  const verifiedResult = jwt.verify(token, JWT_SECRET);
  return verifiedResult;
}

module.exports = { generateToken, validateToken };
