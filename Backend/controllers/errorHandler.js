
exports.errorHandlers = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404).json({ message: "Page not found" });
  
};