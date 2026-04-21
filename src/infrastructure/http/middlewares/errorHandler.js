function errorHandler(err, req, res, next) {
  console.error(`[ERROR] ${err.message}`);

  // Errores de negocio (lanzados por los casos de uso)
  if (err.message && !err.status) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Error interno del servidor',
  });
}

module.exports = errorHandler;
