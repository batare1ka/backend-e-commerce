import * as userRepository from "../repositories/user.repository.js";
import { hashPassword } from "../utils/password.js";
import HttpError from "../errors/http-error.js";

export async function register(data) {
  const {
    email,
    username,
    password,
    firstName,
    lastName,
    phone,
    avatarUrl,
    bio,
    preferredLanguage,
    countryCode,
    timezone,
  } = data;

  // Check email uniqueness
  const existingEmail = await userRepository.findByEmail(email);

  if (existingEmail) {
    throw new HttpError(409, "Email is already registered.");
  }

  // Check username uniqueness
  const existingUsername = await userRepository.findByUsername(username);

  if (existingUsername) {
    throw new HttpError(409, "Username is already taken.");
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
    phone: phone ?? null,
    avatarUrl: avatarUrl ?? null,
    bio: bio ?? null,
    preferredLanguage: preferredLanguage ?? 'en',
    countryCode: countryCode ?? null,
    timezone: timezone ?? 'UTC',
  };

  // Save to database
  const createdUser = await userRepository.create(userToCreate);

  return createdUser;
}
