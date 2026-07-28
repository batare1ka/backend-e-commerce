import * as userRepository from "../repositories/user.repository.js";
import { hashPassword } from "../utils/password.js";
// import { ApiError } from "../utils/ApiError.js";

export async function register(data) {
  const {
    email,
    username,
    password,
    firstName,
    lastName,
  } = data;

  // Check email uniqueness
  const existingEmail = await userRepository.findByEmail(email);

  if (existingEmail) {
    throw new ApiError(409, "Email is already registered.");
  }

  // Check username uniqueness
  const existingUsername = await userRepository.findByUsername(username);

  if (existingUsername) {
    throw new ApiError(409, "Username is already taken.");
  }

  // Hash password
  const passwordHash = await hashPassword(password);

  // Prepare database model
  const userToCreate = {
    email,
    username,
    passwordHash,
    firstName,
    lastName,
    displayName: `${firstName} ${lastName}`,
    role: "user",
    isActive: true,
    isVerified: false,
  };

//   // Save to database
//   const createdUser = await userRepository.create(userToCreate);

//   // Never expose password hashes
  return 'createdUser';
}
