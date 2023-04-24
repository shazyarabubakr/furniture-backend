export const handleError = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "internal server error!";
  const errorCode = err.errorCode || 0;
  res.status(status).json({ status: "error", data: { message, errorCode } });
};
