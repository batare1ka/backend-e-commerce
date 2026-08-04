import jwt from "jsonwebtoken";

export function generateAccessToken(payload) {
  return jwt.sign(
    payload,
    process.env.JWT_ACCESS_SECRET,
    {
      expiresIn: "15m"
    }
  );
}


export function generateRefreshToken(payload) {
  return jwt.sign(
    payload,
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: "7d"
    }
  );
}

export function verifyToken(token, secret) {
  return jwt.verify(token, secret);
}
