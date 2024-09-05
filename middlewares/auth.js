const { validateToken } = require("../utils/auth");

const checkForValidToken = (req, res, next) => {
  const token = req.cookies["token"];
  if (!token) {
    return next();
  }
  try {
    const validationResultPayload = validateToken(token);
    req.user = validationResultPayload;
    return next();
  } catch (err) {
    return next();
  }
};

module.exports = { checkForValidToken };
