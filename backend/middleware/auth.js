const AppError = require("../utils/AppError");

function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new AppError("Authentication token missing", 401));
  }

  const token = authHeader.split(" ")[1];

  // TODO: Verify JWT or session token here when authentication is added.
  req.user = {
    token,
  };

  next();
}

module.exports = {
  requireAuth,
};
