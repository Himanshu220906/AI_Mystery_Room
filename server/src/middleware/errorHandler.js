export function notFound(_req, res) { res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'The requested resource was not found.' } }); }
export function errorHandler(error, _req, res, _next) {
  const status = error.status || (error.name === 'ZodError' ? 400 : 500);
  const code = error.code || (error.name === 'ZodError' ? 'VALIDATION_ERROR' : 'INTERNAL_SERVER_ERROR');
  if (status >= 500) console.error(error);
  res.status(status).json({ success: false, error: { code, message: status >= 500 && code === 'INTERNAL_SERVER_ERROR' ? 'Something went wrong. Please try again.' : error.message } });
}
