function errorHandler(err, req, res, next) {
  console.error(err);
  
  // Check if response already sent
  if (res.headersSent) {
    return next(err);
  }

  // Default to 500 server error
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';

  res.status(status).json({ 
    error: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
}

module.exports = errorHandler; 