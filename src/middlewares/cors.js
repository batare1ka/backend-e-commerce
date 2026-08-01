export const allowCors = (req, res, next) => {
  res.header('Access-Control-Allow-Origin',
    'http://localhost:4200');
    res.header(
    'Access-Control-Allow-Credentials',
    'true'
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200)
  }
  next()
}
