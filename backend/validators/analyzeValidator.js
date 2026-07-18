function requireAnyBusinessField(req, res, next) {
  const { name, phone, website, email } = req.body || {};

  if (!name && !phone && !website && !email) {
    const AppError = require("../utils/AppError");
    return next(new AppError("No business data provided", 400));
  }

  next();
}

module.exports = {
  requireAnyBusinessField,
};
