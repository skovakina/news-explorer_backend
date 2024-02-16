const jwt = require("jsonwebtoken");
const UnauthorizedError = require("../utils/UnauthorizedError");

const { JWT_SECRET, NODE_ENV } = process.env;

const extractBearerToken = (header) => header.replace("Bearer ", "");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw new UnauthorizedError("Incorrect email or password");
  }

  const token = extractBearerToken(authorization);

  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === "production" ? JWT_SECRET : "dev-secret",
    );
  } catch (err) {
    return next(new UnauthorizedError("Incorrect email or password"));
  }

  req.user = payload;
  return next();
};
