const AppError = require("../utils/AppError");

function validate(schema, source = "body") {
  return function validationMiddleware(req, res, next) {
    const data = req[source] || {};
    const errors = [];

    for (const [field, rules] of Object.entries(schema)) {
      const value = data[field];

      if (rules.required && (value === undefined || value === null || value === "")) {
        errors.push(`${field} is required`);
        continue;
      }

      if (value === undefined || value === null || value === "") {
        continue;
      }

      if (rules.type && typeof value !== rules.type) {
        errors.push(`${field} must be a ${rules.type}`);
      }

      if (rules.minLength && String(value).trim().length < rules.minLength) {
        errors.push(`${field} must be at least ${rules.minLength} characters`);
      }
    }

    if (errors.length > 0) {
      return next(new AppError("Validation failed", 400, errors));
    }

    next();
  };
}

module.exports = validate;
