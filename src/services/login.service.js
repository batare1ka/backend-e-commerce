import * as userRepository from "../repositories/user.repository.js";
import { comparePassword } from "../utils/password.js";
import {
  generateAccessToken,
  generateRefreshToken
} from "../utils/jwt.js";

import ApiError from "../errors/http-error.js";


export async function login(data) {

  const {
    email,
    password
  } = data;


  const user =
    await userRepository.findAuthUserByEmail(email);


  if (!user) {
    throw new ApiError(
      401,
      "Invalid email or password"
    );
  }


  if (!user.is_active) {
    throw new ApiError(
      403,
      "Account is disabled"
    );
  }


  const passwordMatches =
    await comparePassword(
      password,
      user.password_hash
    );


  if (!passwordMatches) {
    throw new ApiError(
      401,
      "Invalid email or password"
    );
  }

  const accessToken =
    generateAccessToken({
      userId: user.id,
      role: user.role
    });


  const refreshToken =
    generateRefreshToken({
      userId: user.id
    });

    await userRepository.updateLastLogin(user.id);

  return {
    user: {
      id: user.id,
      email: user.email,
      username: user.username,
      displayName: user.display_name,
      role: user.role
    },

    accessToken,
    refreshToken
  };
}