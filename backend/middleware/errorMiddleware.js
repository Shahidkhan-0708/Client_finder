const AppError = require("../utils/AppError");

function notFound(req, res, next) {
  next(new AppError(`Route not found: ${req.originalUrl}`, 404));
}

function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;
  const isProduction = process.env.NODE_ENV === "production";

  if (!isProduction) {
    console.error(`[${req.method}] ${req.originalUrl}`, err);
  }

  return res.status(statusCode).json({
    success: false,
    error: err.message || "Internal Server Error",
    details: err.details || undefined,
    stack: isProduction ? undefined : err.stack,
  });
}

module.exports = {
  notFound,
  errorHandler,
};
