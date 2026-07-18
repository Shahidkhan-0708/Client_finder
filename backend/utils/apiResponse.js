function sendSuccess(res, statusCode = 200, message = "Success", data = {}) {
  return res.status(statusCode).json({
    success: true,
    message,
    ...data,
  });
}

function sendCreated(res, message = "Created", data = {}) {
  return sendSuccess(res, 201, message, data);
}

module.exports = {
  sendSuccess,
  sendCreated,
};
