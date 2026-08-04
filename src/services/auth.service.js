import ApiError from "../errors/http-error.js";
import { findAuthUserById } from "../repositories/user.repository.js";
import { parseCookies } from "../utils/cookies.js";
import { verifyToken } from "../utils/jwt.js";

const REFRESH_TOKEN_COOKIE = "refreshToken";

export async function getCurrentUser(cookieHeader) {
  const cookies = parseCookies(cookieHeader);
  const token = cookies[REFRESH_TOKEN_COOKIE];

  if (!token) {
    throw new ApiError(401, "Not authenticated");
  }

  let payload;
  try {
    payload = verifyToken(token, process.env.JWT_REFRESH_SECRET);
  } catch {
    throw new ApiError(401, "Session expired");
  }

  const user = await findAuthUserById(payload.userId);

  if (!user || !user.is_active) {
    throw new ApiError(401, "Not authenticated");
  }

  return {
    id: user.id,
    email: user.email,
    username: user.username,
    displayName: user.display_name,
    role: user.role,
  };
}
