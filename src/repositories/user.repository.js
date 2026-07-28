import { DiContainer } from '../container.js'

export async function findByEmail(email) {
  const query = `
    SELECT *
    FROM users
    WHERE email = $1
      AND deleted_at IS NULL
    LIMIT 1
  `;

  const values = [email];
  const pool = DiContainer.get('pool');

  const result = await pool.query(query, values);

  return result.rows[0] ?? null;
};

export async function findByUsername(username) {
  const query = `
    SELECT *
    FROM users
    WHERE username = $1
      AND deleted_at IS NULL
    LIMIT 1
  `;

  const values = [username];
  const pool = DiContainer.get('pool');

  const result = await pool.query(query, values);

  return result.rows[0] ?? null;
}

export async function create(user) {
  const query = `
    INSERT INTO users (
      email,
      username,
      password_hash,
      first_name,
      last_name,
      display_name,
      role,
      is_active,
      is_verified,
      phone,
      avatar_url,
      bio,
      preferred_language,
      country_code,
      timezone
    )
    VALUES (
      $1,
      $2,
      $3,
      $4,
      $5,
      $6,
      $7,
      $8,
      $9,
      $10,
      $11,
      $12,
      $13,
      $14,
      $15
    )
    RETURNING
      id,
      email,
      username,
      first_name,
      last_name,
      display_name,
      role,
      is_active,
      is_verified,
      created_at;
  `;


  const values = [
    user.email,
    user.username,
    user.passwordHash,
    user.firstName,
    user.lastName,
    user.displayName,
    user.role,
    user.isActive,
    user.isVerified,
    user.phone,
    user.avatarUrl,
    user.bio,
    user.preferredLanguage,
    user.countryCode,
    user.timezone,
  ];

  const pool = DiContainer.get('pool');
  const result = await pool.query(query, values);

  return result.rows[0];
}
