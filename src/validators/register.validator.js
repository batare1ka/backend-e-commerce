import { z } from "zod";

export const registerSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Invalid email address"),

  username: z
    .string()
    .trim()
    .min(3, "Username must be at least 3 characters.")
    .max(30, "Username cannot exceed 30 characters.")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers and underscores."
    ),

  password: z
    .string()
    .min(8, "Password must contain at least 8 characters.")
    .max(128, "Password is too long.")
    .regex(/[A-Z]/, "Password must contain an uppercase letter.")
    .regex(/[a-z]/, "Password must contain a lowercase letter.")
    .regex(/[0-9]/, "Password must contain a number.")
    .regex(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain a special character."
    ),

  firstName: z
    .string()
    .trim()
    .min(1, "First name is required.")
    .max(100, "First name is too long."),

  lastName: z
    .string()
    .trim()
    .min(1, "Last name is required.")
    .max(100, "Last name is too long."),

  phone: z
    .string()
    .trim()
    .max(30, "Phone number is too long.")
    .optional(),

  avatarUrl: z
    .string()
    .url("Avatar URL must be a valid URL.")
    .optional(),

  bio: z
    .string()
    .trim()
    .max(500, "Bio must be under 500 characters.")
    .optional(),

  preferredLanguage: z
    .string()
    .trim()
    .length(2, "Language must be a 2-letter code.")
    .optional(),

  countryCode: z
    .string()
    .trim()
    .length(2, "Country code must be a 2-letter code.")
    .optional(),

  timezone: z
    .string()
    .trim()
    .min(1, "Timezone is required.")
    .max(64, "Timezone is too long.")
    .optional(),
});
